// FRONT-END: play "hover" video cards while hovered or focused, and stop autoplay for reduced motion.

document.addEventListener( 'DOMContentLoaded', () => {
	const reduceMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	document.querySelectorAll( '.wp-block-build-n-bloom-blocks-video-card' ).forEach( ( card ) => {
		const video = card.querySelector( '.bnb-card__video' );
		if ( ! video ) {
			return;
		}

		if ( card.dataset.playback === 'autoplay' ) {
			if ( reduceMotion ) {
				video.pause();
			}
			return;
		}

		const play = () => video.play().catch( () => {} );
		const stop = () => {
			video.pause();
			video.currentTime = 0;
		};
		card.addEventListener( 'mouseenter', play );
		card.addEventListener( 'focusin', play );
		card.addEventListener( 'mouseleave', stop );
		card.addEventListener( 'focusout', stop );
	} );
} );
