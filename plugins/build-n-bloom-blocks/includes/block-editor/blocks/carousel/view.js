// FRONT-END: runs the carousel with Slick (https://kenwheeler.github.io/slick/).
// Without JS the slides still scroll by swipe/scrollbar (see style.scss).
import $ from 'jquery';
import 'slick-carousel';

// Must match $tablet-up and $desktop-up in variables.scss
const TABLET_UP = 768;
const DESKTOP_UP = 1024;

function slideCount( carousel, name ) {
	return parseInt( carousel.style.getPropertyValue( name ), 10 ) || 1;
}

function initCarousel( carousel ) {
	const $track = $( carousel ).children( '.bnb-carousel__track' );
	if ( $track.children().length < 2 ) {
		return;
	}

	const prevButton = carousel.querySelector( ':scope > .bnb-carousel__arrow--prev' );
	const nextButton = carousel.querySelector( ':scope > .bnb-carousel__arrow--next' );
	const dotsContainer = carousel.querySelector( ':scope > .bnb-carousel__dots' );
	const reducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
	const autoplaySpeed = parseInt( carousel.dataset.autoplaySpeed, 10 );
	const slides = {
		mobile: slideCount( carousel, '--bnb-carousel-slides-mobile' ),
		tablet: slideCount( carousel, '--bnb-carousel-slides-tablet' ),
		desktop: slideCount( carousel, '--bnb-carousel-slides' ),
	};

	$track.slick( {
		rows: 0, // keep the slides as Slick's slides, without an extra wrapper
		slidesToShow: slides.mobile,
		slidesToScroll: 1,
		infinite: carousel.dataset.loop === 'true',
		speed: reducedMotion ? 0 : 500,
		autoplay: Boolean( autoplaySpeed ) && ! reducedMotion,
		autoplaySpeed: autoplaySpeed || 5000,
		pauseOnHover: true,
		pauseOnFocus: true,
		arrows: Boolean( prevButton && nextButton ),
		prevArrow: prevButton,
		nextArrow: nextButton,
		dots: Boolean( dotsContainer ),
		appendDots: dotsContainer,
		mobileFirst: true,
		// mobileFirst breakpoints apply above the given width
		responsive: [
			{ breakpoint: TABLET_UP - 1, settings: { slidesToShow: slides.tablet } },
			{ breakpoint: DESKTOP_UP - 1, settings: { slidesToShow: slides.desktop } },
		],
	} );

	carousel.classList.add( 'bnb-carousel--ready' );
}

$( () => {
	document.querySelectorAll( '.wp-block-build-n-bloom-blocks-carousel' ).forEach( initCarousel );
} );
