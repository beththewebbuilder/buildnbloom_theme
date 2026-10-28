// FRONT-END: plays the background video for the current screen size (desktop or mobile media), the pause/play
// button, and no autoplay for visitors who prefer reduced motion.
// Without JS a hero with one background still plays muted on a loop; with separate mobile media the fallback image shows.
// Also opens the button's YouTube/Vimeo video in a popup. Without JS the button links to the video page instead.

const reducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' );
const mobileScreen = window.matchMedia( '(max-width: 767px)' ); // $sml-screen-size

function initBackgroundVideo( hero ) {
	const videos = Array.from( hero.querySelectorAll( ':scope > .bnb-hero__media > .bnb-hero__video' ) );
	const button = hero.querySelector( ':scope > .bnb-hero__pause' );
	if ( ! videos.length || ! button ) {
		return;
	}

	let paused = reducedMotion.matches;

	// The video in the media layer shown at this screen size (none if that layer is an image)
	const visibleVideo = () => videos.find( ( video ) => video.offsetParent !== null );

	function update() {
		const video = visibleVideo();
		videos.forEach( ( other ) => {
			if ( other !== video ) {
				other.pause();
			}
		} );

		button.hidden = ! video;
		if ( ! video ) {
			return;
		}
		if ( paused ) {
			video.pause();
		} else {
			video.play().catch( () => {} );
		}
		button.classList.toggle( 'is-paused', paused );
		button.setAttribute( 'aria-label', paused ? 'Play background video' : 'Pause background video' );
	}

	button.addEventListener( 'click', () => {
		paused = ! paused;
		update();
	} );
	mobileScreen.addEventListener( 'change', update );
	update();
}

function initVideoPopup( hero ) {
	const trigger = hero.querySelector( ':scope > .bnb-hero__content [data-bnb-hero-video]' );
	const dialog = hero.querySelector( ':scope > .bnb-hero__modal' );
	// Browsers without <dialog> support follow the link to the video page
	if ( ! trigger || ! dialog || typeof dialog.showModal !== 'function' ) {
		return;
	}

	const frame = dialog.querySelector( '.bnb-hero__modal-frame' );
	let pausedBackground = [];

	trigger.addEventListener( 'click', ( event ) => {
		event.preventDefault();

		// The player is only loaded when the popup opens, and autoplays as it was opened by a click
		const src = trigger.dataset.bnbHeroVideo;
		const iframe = document.createElement( 'iframe' );
		iframe.src = src + ( src.includes( '?' ) ? '&' : '?' ) + 'autoplay=1';
		iframe.title = trigger.textContent.trim() || 'Video';
		iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
		iframe.allowFullscreen = true;
		frame.replaceChildren( iframe );

		// Pause the background video behind the popup, and resume it on close
		pausedBackground = Array.from( hero.querySelectorAll( '.bnb-hero__video' ) ).filter( ( video ) => ! video.paused );
		pausedBackground.forEach( ( video ) => video.pause() );

		dialog.showModal();
	} );

	dialog.querySelector( '.bnb-hero__modal-close' ).addEventListener( 'click', () => dialog.close() );
	// Clicking the backdrop closes the popup (Esc is handled by <dialog>)
	dialog.addEventListener( 'click', ( event ) => {
		if ( event.target === dialog ) {
			dialog.close();
		}
	} );
	dialog.addEventListener( 'close', () => {
		frame.replaceChildren(); // removing the player stops the video
		pausedBackground.forEach( ( video ) => video.play().catch( () => {} ) );
		pausedBackground = [];
	} );
}

document.querySelectorAll( '.wp-block-build-n-bloom-blocks-hero-media' ).forEach( ( hero ) => {
	initBackgroundVideo( hero );
	initVideoPopup( hero );
} );
