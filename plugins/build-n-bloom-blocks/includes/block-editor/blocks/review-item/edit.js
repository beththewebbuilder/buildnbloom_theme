import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaPlaceholder, RichText } from '@wordpress/block-editor';
import { PanelBody, TextareaControl } from '@wordpress/components';
import MediaControl from '../../components/media-control';

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
				<PanelBody title={ __( 'Image', 'build-n-bloom-blocks' ) }>
					<MediaControl
						label={ __( 'Logo or photo', 'build-n-bloom-blocks' ) }
						mediaId={ attributes.imageId }
						mediaUrl={ attributes.imageUrl }
						onSelect={ onSelectImage }
						onRemove={ removeImage } />
					{ attributes.imageUrl &&
						<TextareaControl
							label={ __( 'Alt text', 'build-n-bloom-blocks' ) }
							help={ __( 'E.g. the company name for a logo, or the person\'s name for a photo.', 'build-n-bloom-blocks' ) }
							value={ attributes.imageAlt }
							onChange={ ( imageAlt ) => setAttributes( { imageAlt } ) } />
					}
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ attributes.imageUrl
					? <div className="bnb-review__image"><img src={ attributes.imageUrl } alt={ attributes.imageAlt } /></div>
					: <MediaPlaceholder
						icon="format-image"
						labels={ { title: __( 'Logo or photo', 'build-n-bloom-blocks' ) } }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						onSelect={ onSelectImage } />
				}
				<RichText
					tagName="h3"
					className="bnb-review__company"
					placeholder={ __( 'Company name…', 'build-n-bloom-blocks' ) }
					value={ attributes.company }
					onChange={ ( company ) => setAttributes( { company } ) } />
				<RichText
					tagName="p"
					className="bnb-review__text"
					placeholder={ __( 'Review text…', 'build-n-bloom-blocks' ) }
					value={ attributes.review }
					onChange={ ( review ) => setAttributes( { review } ) } />
				<RichText
					tagName="p"
					className="bnb-review__author"
					placeholder={ __( 'Name (optional)…', 'build-n-bloom-blocks' ) }
					value={ attributes.author }
					onChange={ ( author ) => setAttributes( { author } ) } />
			</div>
		</>
	);
}
