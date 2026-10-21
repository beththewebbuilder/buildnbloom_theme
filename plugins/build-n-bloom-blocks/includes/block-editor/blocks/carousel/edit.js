import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { carouselStyle } from './save';

// Only slides can go in the carousel
const ALLOWED_BLOCKS = [ 'build-n-bloom-blocks/carousel-slide' ];
const TEMPLATE = [
	[ 'build-n-bloom-blocks/carousel-slide' ],
	[ 'build-n-bloom-blocks/carousel-slide' ],
	[ 'build-n-bloom-blocks/carousel-slide' ],
];

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { style: carouselStyle( attributes ) } );
	// In the editor all slides are shown wrapped onto rows so each one can be edited (see editor.scss)
	const innerBlocksProps = useInnerBlocksProps( { className: 'bnb-carousel__track' }, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		orientation: 'horizontal',
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Slides', 'build-n-bloom-blocks' ) }>
					<RangeControl
						label={ __( 'Slides visible (desktop)', 'build-n-bloom-blocks' ) }
						value={ attributes.slidesPerView }
						onChange={ ( slidesPerView ) => setAttributes( { slidesPerView } ) }
						min={ 1 }
						max={ 8 } />
					<RangeControl
						label={ __( 'Slides visible (tablet)', 'build-n-bloom-blocks' ) }
						value={ attributes.tabletSlidesPerView }
						onChange={ ( tabletSlidesPerView ) => setAttributes( { tabletSlidesPerView } ) }
						min={ 1 }
						max={ 6 } />
					<RangeControl
						label={ __( 'Slides visible (mobile)', 'build-n-bloom-blocks' ) }
						value={ attributes.mobileSlidesPerView }
						onChange={ ( mobileSlidesPerView ) => setAttributes( { mobileSlidesPerView } ) }
						min={ 1 }
						max={ 4 } />
					<UnitControl
						label={ __( 'Slide height (empty = image height)', 'build-n-bloom-blocks' ) }
						value={ attributes.slideHeight }
						units={ [
							{ value: 'px', label: 'px' },
							{ value: 'vh', label: 'vh' },
							{ value: 'rem', label: 'rem' },
						] }
						onChange={ ( slideHeight ) => setAttributes( { slideHeight: slideHeight || '' } ) } />
					<SelectControl
						label={ __( 'Image fit', 'build-n-bloom-blocks' ) }
						help={ __( 'Use "Fit inside" for logos so they are not cropped.', 'build-n-bloom-blocks' ) }
						value={ attributes.imageFit }
						options={ [
							{ label: __( 'Fill and crop', 'build-n-bloom-blocks' ), value: 'cover' },
							{ label: __( 'Fit inside', 'build-n-bloom-blocks' ), value: 'contain' },
						] }
						onChange={ ( imageFit ) => setAttributes( { imageFit } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Navigation', 'build-n-bloom-blocks' ) }>
					<ToggleControl
						label={ __( 'Show arrows', 'build-n-bloom-blocks' ) }
						checked={ attributes.showArrows }
						onChange={ ( showArrows ) => setAttributes( { showArrows } ) } />
					<ToggleControl
						label={ __( 'Show dots', 'build-n-bloom-blocks' ) }
						checked={ attributes.showDots }
						onChange={ ( showDots ) => setAttributes( { showDots } ) } />
					<ToggleControl
						label={ __( 'Loop back to the start', 'build-n-bloom-blocks' ) }
						checked={ attributes.loop }
						onChange={ ( loop ) => setAttributes( { loop } ) } />
					<ToggleControl
						label={ __( 'Scroll automatically', 'build-n-bloom-blocks' ) }
						help={ __( 'Pauses on hover and is turned off for visitors who prefer reduced motion.', 'build-n-bloom-blocks' ) }
						checked={ attributes.autoplay }
						onChange={ ( autoplay ) => setAttributes( { autoplay } ) } />
					{ attributes.autoplay &&
						<RangeControl
							label={ __( 'Seconds per slide', 'build-n-bloom-blocks' ) }
							value={ attributes.autoplaySeconds }
							onChange={ ( autoplaySeconds ) => setAttributes( { autoplaySeconds } ) }
							min={ 2 }
							max={ 15 } />
					}
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
