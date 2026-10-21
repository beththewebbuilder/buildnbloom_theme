// FRONT-END: arrows, dots and autoplay for the carousel. Without JS the slides still scroll by swipe/scrollbar.

function initCarousel( carousel ) {
	const track = carousel.querySelector( ':scope > .bnb-carousel__track' );
	const slides = track ? Array.from( track.children ) : [];
	if ( slides.length < 2 ) {
		return;
	}

	const prevButton = carousel.querySelector( ':scope > .bnb-carousel__arrow--prev' );
	const nextButton = carousel.querySelector( ':scope > .bnb-carousel__arrow--next' );
	const dotsContainer = carousel.querySelector( ':scope > .bnb-carousel__dots' );
	const loop = carousel.dataset.loop === 'true';

	const atStart = () => track.scrollLeft <= 1;
	const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
	const currentIndex = () => {
		const left = track.scrollLeft;
		let closest = 0;
		slides.forEach( ( slide, index ) => {
			if ( Math.abs( slide.offsetLeft - left ) < Math.abs( slides[ closest ].offsetLeft - left ) ) {
				closest = index;
			}
		} );
		return closest;
	};
	const goTo = ( index ) => {
		const slide = slides[ Math.max( 0, Math.min( index, slides.length - 1 ) ) ];
		track.scrollTo( { left: slide.offsetLeft } );
	};
	const next = () => ( atEnd() ? loop && goTo( 0 ) : goTo( currentIndex() + 1 ) );
	const prev = () => ( atStart() ? loop && goTo( slides.length - 1 ) : goTo( currentIndex() - 1 ) );

	prevButton?.addEventListener( 'click', prev );
	nextButton?.addEventListener( 'click', next );

	// One dot per slide
	const dots = dotsContainer ? slides.map( ( slide, index ) => {
		const dot = document.createElement( 'button' );
		dot.type = 'button';
		dot.className = 'bnb-carousel__dot';
		dot.setAttribute( 'aria-label', `Go to slide ${ index + 1 }` );
		dot.addEventListener( 'click', () => goTo( index ) );
		dotsContainer.appendChild( dot );
		return dot;
	} ) : [];

	const update = () => {
		const active = currentIndex();
		dots.forEach( ( dot, index ) => dot.setAttribute( 'aria-current', index === active ? 'true' : 'false' ) );
		if ( ! loop ) {
			if ( prevButton ) {
				prevButton.disabled = atStart();
			}
			if ( nextButton ) {
				nextButton.disabled = atEnd();
			}
		}
	};
	track.addEventListener( 'scroll', () => window.requestAnimationFrame( update ), { passive: true } );
	window.addEventListener( 'resize', update );
	update();

	// Autoplay pauses while the visitor is hovering or focused on the carousel
	const seconds = parseFloat( carousel.dataset.autoplay );
	if ( seconds && ! window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
		let timer = null;
		const start = () => {
			if ( ! timer ) {
				timer = window.setInterval( () => ( atEnd() && ! loop ? stop() : next() ), seconds * 1000 );
			}
		};
		const stop = () => {
			window.clearInterval( timer );
			timer = null;
		};
		carousel.addEventListener( 'mouseenter', stop );
		carousel.addEventListener( 'mouseleave', start );
		carousel.addEventListener( 'focusin', stop );
		carousel.addEventListener( 'focusout', start );
		start();
	}
}

document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.wp-block-build-n-bloom-blocks-carousel' ).forEach( initCarousel );
} );
