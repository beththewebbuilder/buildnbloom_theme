import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaPlaceholder, RichText } from '@wordpress/block-editor';
import { PanelBody, FocalPointPicker, RadioControl, SelectControl, TextareaControl, ToggleControl } from '@wordpress/components';
import MediaControl from '../../components/media-control';
import LinkControl from '../../components/link-control';
import { slideClassName, slideStyle } from './save';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: slideClassName( attributes ), style: slideStyle( attributes ) } );

	function onSelectImage( image ) {
		setAttributes( { imageId: image.id, imageUrl: image.url, imageAlt: image.alt || '' } );
	}
	function removeImage() {
		setAttributes( { imageId: 0, imageUrl: '', imageAlt: '', focalPoint: undefined } );
	}
	function onSelectMobileImage( image ) {
		setAttributes( { mobileImageId: image.id, mobileImageUrl: image.url } );
	}
	function removeMobileImage() {
		setAttributes( { mobileImageId: 0, mobileImageUrl: '', mobileFocalPoint: undefined } );
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Image', 'build-n-bloom-blocks' ) }>
					<MediaControl
						label={ __( 'Image', 'build-n-bloom-blocks' ) }
						mediaId={ attributes.imageId }
						mediaUrl={ attributes.imageUrl }
						onSelect={ onSelectImage }
						onRemove={ removeImage } />
					{ attributes.imageUrl &&
						<>
							<FocalPointPicker
								label={ __( 'Focal point', 'build-n-bloom-blocks' ) }
								help={ __( 'The part of the image that stays in view when it is cropped.', 'build-n-bloom-blocks' ) }
								url={ attributes.imageUrl }
								value={ attributes.focalPoint }
								onChange={ ( focalPoint ) => setAttributes( { focalPoint } ) } />
							<TextareaControl
								label={ __( 'Alt text', 'build-n-bloom-blocks' ) }
								help={ __( 'Describe the image for people who can\'t see it, e.g. the company name for a logo.', 'build-n-bloom-blocks' ) }
								value={ attributes.imageAlt }
								onChange={ ( imageAlt ) => setAttributes( { imageAlt } ) } />
						</>
					}
					<ToggleControl
						label={ __( 'Different image on mobile', 'build-n-bloom-blocks' ) }
						help={ __( 'Shown on screens up to 767px wide instead of the image above. It uses the same alt text.', 'build-n-bloom-blocks' ) }
						checked={ attributes.useMobileImage }
						onChange={ ( useMobileImage ) => setAttributes( { useMobileImage } ) } />
					{ attributes.useMobileImage &&
						<>
							<MediaControl
								label={ __( 'Mobile image', 'build-n-bloom-blocks' ) }
								mediaId={ attributes.mobileImageId }
								mediaUrl={ attributes.mobileImageUrl }
								onSelect={ onSelectMobileImage }
								onRemove={ removeMobileImage } />
							{ attributes.mobileImageUrl &&
								<FocalPointPicker
									label={ __( 'Mobile focal point', 'build-n-bloom-blocks' ) }
									url={ attributes.mobileImageUrl }
									value={ attributes.mobileFocalPoint }
									onChange={ ( mobileFocalPoint ) => setAttributes( { mobileFocalPoint } ) } />
							}
						</>
					}
				</PanelBody>
				<PanelBody title={ __( 'Link', 'build-n-bloom-blocks' ) } initialOpen={ false }>
					<LinkControl attributes={ attributes } setAttributes={ setAttributes } />
				</PanelBody>
			</InspectorControls>

			{ /* Styles tab of the block sidebar */ }
			<InspectorControls group="styles">
				<PanelBody title={ __( 'Layout', 'build-n-bloom-blocks' ) }>
					<RadioControl
						label={ __( 'Heading and text', 'build-n-bloom-blocks' ) }
						selected={ attributes.captionPosition }
						options={ [
							{ label: __( 'Below the image', 'build-n-bloom-blocks' ), value: 'below' },
							{ label: __( 'Over the image', 'build-n-bloom-blocks' ), value: 'overlay' },
						] }
						onChange={ ( captionPosition ) => setAttributes( { captionPosition } ) } />
					<SelectControl
						label={ __( 'Image fit', 'build-n-bloom-blocks' ) }
						value={ attributes.imageFit }
						options={ [
							{ label: __( 'Same as the carousel', 'build-n-bloom-blocks' ), value: '' },
							{ label: __( 'Fill and crop', 'build-n-bloom-blocks' ), value: 'cover' },
							{ label: __( 'Fit inside', 'build-n-bloom-blocks' ), value: 'contain' },
						] }
						onChange={ ( imageFit ) => setAttributes( { imageFit } ) } />
					<SelectControl
						label={ __( 'Hover effect', 'build-n-bloom-blocks' ) }
						help={ __( 'Shown when the visitor points at or tabs to the slide.', 'build-n-bloom-blocks' ) }
						value={ attributes.hoverEffect }
						options={ [
							{ label: __( 'None', 'build-n-bloom-blocks' ), value: 'none' },
							{ label: __( 'Greyscale, colour on hover', 'build-n-bloom-blocks' ), value: 'greyscale' },
							{ label: __( 'Zoom in', 'build-n-bloom-blocks' ), value: 'zoom' },
						] }
						onChange={ ( hoverEffect ) => setAttributes( { hoverEffect } ) } />
				</PanelBody>
			</InspectorControls>

			{ /* The canvas shows the desktop image; the mobile one is only previewed in the sidebar */ }
			<div { ...blockProps }>
				<div className="bnb-carousel__slide-inner">
					{ attributes.imageUrl
						? <span className="bnb-carousel__media"><img className="bnb-carousel__image" src={ attributes.imageUrl } alt={ attributes.imageAlt } /></span>
						: <MediaPlaceholder
							icon="format-image"
							labels={ { title: __( 'Slide image', 'build-n-bloom-blocks' ) } }
							accept="image/*"
							allowedTypes={ [ 'image' ] }
							onSelect={ onSelectImage } />
					}
					<div className="bnb-carousel__content">
						<RichText
							tagName="h3"
							className="bnb-carousel__heading"
							placeholder={ __( 'Optional heading…', 'build-n-bloom-blocks' ) }
							value={ attributes.heading }
							onChange={ ( heading ) => setAttributes( { heading } ) } />
						<RichText
							tagName="p"
							className="bnb-carousel__caption"
							placeholder={ __( 'Optional text…', 'build-n-bloom-blocks' ) }
							value={ attributes.caption }
							onChange={ ( caption ) => setAttributes( { caption } ) } />
					</div>
				</div>
			</div>
		</>
	);
}
