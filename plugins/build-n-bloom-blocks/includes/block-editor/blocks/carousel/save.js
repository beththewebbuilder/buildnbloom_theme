import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { cssVariables } from '../../utils';

// Settings are passed to the stylesheet as CSS custom properties
export function carouselStyle( attributes ) {
	return cssVariables( {
		'--bnb-carousel-slides': attributes.slidesPerView,
		'--bnb-carousel-slides-tablet': attributes.tabletSlidesPerView,
		'--bnb-carousel-slides-mobile': attributes.mobileSlidesPerView,
		'--bnb-carousel-slide-height': attributes.slideHeight,
		'--bnb-carousel-image-fit': attributes.imageFit,
		'--bnb-carousel-arrow-color': attributes.arrowColor,
		'--bnb-carousel-arrow-background': attributes.arrowBackgroundColor,
	} );
}

export function Chevron( { direction } ) {
	return (
		<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
			<path d={ direction === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7' } fill="none" stroke="currentColor" stroke-width="2" />
		</svg>
	);
}

// Shared with deprecated.js, which only differs in the data attributes it saves
export function CarouselMarkup( { attributes, data } ) {
	const blockProps = useBlockProps.save( {
		style: carouselStyle( attributes ),
		role: 'region',
		'aria-roledescription': 'carousel',
		'aria-label': __( 'Carousel', 'build-n-bloom-blocks' ),
		...data,
	} );

	return (
		<div { ...blockProps }>
			<div { ...useInnerBlocksProps.save( { className: 'bnb-carousel__track' } ) } />
			{ attributes.showArrows &&
				<>
					<button type="button" className="bnb-carousel__arrow bnb-carousel__arrow--prev" aria-label={ __( 'Previous slide', 'build-n-bloom-blocks' ) }>
						<Chevron direction="prev" />
					</button>
					<button type="button" className="bnb-carousel__arrow bnb-carousel__arrow--next" aria-label={ __( 'Next slide', 'build-n-bloom-blocks' ) }>
						<Chevron direction="next" />
					</button>
				</>
			}
			{ attributes.showDots &&
				<div className="bnb-carousel__dots"></div>
			}
		</div>
	);
}

// view.js reads the data attributes and the --bnb-carousel-slides* variables to set up Slick
export default function save( { attributes } ) {
	return (
		<CarouselMarkup
			attributes={ attributes }
			data={ {
				'data-autoplay-speed': attributes.autoplay ? String( attributes.autoplaySpeed ) : undefined,
				'data-loop': attributes.loop ? 'true' : undefined,
			} } />
	);
}
