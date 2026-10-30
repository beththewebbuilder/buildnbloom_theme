import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import AddBlockButton from '../../components/add-block-button';
import { carouselStyle, Chevron } from './save';

// Only slides can go in the carousel
const ALLOWED_BLOCKS = [ 'build-n-bloom-blocks/carousel-slide', 'build-n-bloom-blocks/review-item' ];
const TEMPLATE = [
	[ 'build-n-bloom-blocks/carousel-slide' ],
	[ 'build-n-bloom-blocks/carousel-slide' ],
	[ 'build-n-bloom-blocks/carousel-slide' ],
];

// Height presets, saved as the CSS height itself (screen heights based on the old Apex carousel).
// svh is the screen height without the browser's toolbars on phones.
const MEDIA_HEIGHTS = [
	{ label: __( 'Original image height', 'build-n-bloom-blocks' ), value: '' },
	{ label: __( 'Full screen', 'build-n-bloom-blocks' ), value: '100svh' },
	{ label: __( '3/4 height', 'build-n-bloom-blocks' ), value: '75svh' },
	{ label: __( '1/2 height', 'build-n-bloom-blocks' ), value: '50svh' },
	{ label: __( '1/4 height', 'build-n-bloom-blocks' ), value: '25svh' },
	{ label: __( 'Logo (160px)', 'build-n-bloom-blocks' ), value: '10rem' },
	{ label: __( 'Small (120px)', 'build-n-bloom-blocks' ), value: '7.5rem' },
	{ label: __( 'Extra-small (80px)', 'build-n-bloom-blocks' ), value: '5rem' },
	{ label: __( 'Custom', 'build-n-bloom-blocks' ), value: 'custom' },
];
const LOGO_HEIGHTS = [ '10rem', '7.5rem', '5rem' ];

export default function Edit( { attributes, setAttributes, clientId } ) {
	// Any height that isn't a preset was typed in as a custom one
	const mediaHeight = MEDIA_HEIGHTS.some( ( option ) => option.value === attributes.slideHeight ) ? attributes.slideHeight : 'custom';

	function onChangeMediaHeight( value ) {
		// Logos shouldn't be cropped, so the small fixed heights fit the image inside;
		// every other height goes back to the default "Fill and crop"
		const imageFit = LOGO_HEIGHTS.includes( value ) ? 'contain' : 'cover';
		setAttributes( { slideHeight: value === 'custom' ? '20rem' : value, imageFit } );
	}

	const blockProps = useBlockProps( { className: 'bnb-editor-container', style: carouselStyle( attributes ) } );
	// In the editor all slides are shown wrapped onto rows so each one can be edited (see editor.scss).
	// Slick only runs on the front end.
	const innerBlocksProps = useInnerBlocksProps( { className: 'bnb-carousel__track' }, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		orientation: 'horizontal',
		renderAppender: () => <AddBlockButton rootClientId={ clientId } label={ __( 'Add new slide', 'build-n-bloom-blocks' ) } />,
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
					<SelectControl
						label={ __( 'Media height', 'build-n-bloom-blocks' ) }
						value={ mediaHeight }
						options={ MEDIA_HEIGHTS }
						onChange={ onChangeMediaHeight } />
					{ mediaHeight === 'custom' &&
						<UnitControl
							label={ __( 'Custom height', 'build-n-bloom-blocks' ) }
							value={ attributes.slideHeight }
							units={ [
								{ value: 'px', label: 'px' },
								{ value: 'svh', label: 'svh' },
								{ value: 'rem', label: 'rem' },
							] }
							onChange={ ( slideHeight ) => setAttributes( { slideHeight: slideHeight || '' } ) } />
					}
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
						help={ __( 'Arrow colours are in the Styles tab.', 'build-n-bloom-blocks' ) }
						checked={ attributes.showArrows }
						onChange={ ( showArrows ) => setAttributes( { showArrows } ) } />
					<ToggleControl
						label={ __( 'Show dots', 'build-n-bloom-blocks' ) }
						checked={ attributes.showDots }
						onChange={ ( showDots ) => setAttributes( { showDots } ) } />
					<ToggleControl
						label={ __( 'Loop continuously', 'build-n-bloom-blocks' ) }
						help={ __( 'After the last slide, carry on to the first.', 'build-n-bloom-blocks' ) }
						checked={ attributes.loop }
						onChange={ ( loop ) => setAttributes( { loop } ) } />
					<ToggleControl
						label={ __( 'Scroll automatically', 'build-n-bloom-blocks' ) }
						help={ __( 'Pauses on hover and is turned off for visitors who prefer reduced motion.', 'build-n-bloom-blocks' ) }
						checked={ attributes.autoplay }
						onChange={ ( autoplay ) => setAttributes( { autoplay } ) } />
					{ attributes.autoplay &&
						<RangeControl
							label={ __( 'Time per slide (milliseconds)', 'build-n-bloom-blocks' ) }
							help={ __( '1000 milliseconds = 1 second.', 'build-n-bloom-blocks' ) }
							value={ attributes.autoplaySpeed }
							onChange={ ( autoplaySpeed ) => setAttributes( { autoplaySpeed: autoplaySpeed || 5000 } ) }
							min={ 1000 }
							max={ 15000 }
							step={ 100 } />
					}
				</PanelBody>
			</InspectorControls>

			{ /* Styles tab of the block sidebar */ }
			{ attributes.showArrows &&
				<InspectorControls group="styles">
					<PanelColorSettings
						title={ __( 'Arrows', 'build-n-bloom-blocks' ) }
						colorSettings={ [
							{
								label: __( 'Arrow colour', 'build-n-bloom-blocks' ),
								value: attributes.arrowColor,
								onChange: ( arrowColor ) => setAttributes( { arrowColor: arrowColor || '' } ),
							},
							{
								label: __( 'Arrow background', 'build-n-bloom-blocks' ),
								value: attributes.arrowBackgroundColor,
								onChange: ( arrowBackgroundColor ) => setAttributes( { arrowBackgroundColor: arrowBackgroundColor || '' } ),
							},
						] } />
				</InspectorControls>
			}

			<div { ...blockProps }>
				<span className="bnb-editor-container__label">{ __( 'Carousel', 'build-n-bloom-blocks' ) }</span>
				<div { ...innerBlocksProps } />
				{ /* Non-working copy of the arrows so their colours can be previewed */ }
				{ attributes.showArrows &&
					<div className="bnb-carousel__arrow-preview" aria-hidden="true">
						<span className="bnb-carousel__arrow bnb-carousel__arrow--prev"><Chevron direction="prev" /></span>
						<span className="bnb-carousel__arrow bnb-carousel__arrow--next"><Chevron direction="next" /></span>
					</div>
				}
			</div>
		</>
	);
}
