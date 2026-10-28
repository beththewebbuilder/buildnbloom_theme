import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaPlaceholder, RichText } from '@wordpress/block-editor';
import { PanelBody, TextareaControl } from '@wordpress/components';
import MediaControl from '../../components/media-control';
import LinkControl from '../../components/link-control';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	function onSelectImage( image ) {
		setAttributes( { imageId: image.id, imageUrl: image.url, imageAlt: image.alt || '' } );
	}
	function removeImage() {
		setAttributes( { imageId: 0, imageUrl: '', imageAlt: '' } );
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Slide settings', 'build-n-bloom-blocks' ) }>
					<MediaControl
						label={ __( 'Image', 'build-n-bloom-blocks' ) }
						mediaId={ attributes.imageId }
						mediaUrl={ attributes.imageUrl }
						onSelect={ onSelectImage }
						onRemove={ removeImage } />
					{ attributes.imageUrl &&
						<TextareaControl
							label={ __( 'Alt text', 'build-n-bloom-blocks' ) }
							help={ __( 'Describe the image for people who can\'t see it, e.g. the company name for a logo.', 'build-n-bloom-blocks' ) }
							value={ attributes.imageAlt }
							onChange={ ( imageAlt ) => setAttributes( { imageAlt } ) } />
					}
					<LinkControl attributes={ attributes } setAttributes={ setAttributes } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="bnb-carousel__slide-inner">
					{ attributes.imageUrl
						? <img className="bnb-carousel__image" src={ attributes.imageUrl } alt={ attributes.imageAlt } />
						: <MediaPlaceholder
							icon="format-image"
							labels={ { title: __( 'Slide image', 'build-n-bloom-blocks' ) } }
							accept="image/*"
							allowedTypes={ [ 'image' ] }
							onSelect={ onSelectImage } />
					}
					<RichText
						tagName="p"
						className="bnb-carousel__caption"
						placeholder={ __( 'Optional caption…', 'build-n-bloom-blocks' ) }
						value={ attributes.caption }
						onChange={ ( caption ) => setAttributes( { caption } ) } />
				</div>
			</div>
		</>
	);
}
