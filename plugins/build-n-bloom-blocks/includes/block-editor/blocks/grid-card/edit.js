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
				<PanelBody title={ __( 'Card settings', 'build-n-bloom-blocks' ) }>
					<MediaControl
						label={ __( 'Image', 'build-n-bloom-blocks' ) }
						mediaId={ attributes.imageId }
						mediaUrl={ attributes.imageUrl }
						onSelect={ onSelectImage }
						onRemove={ removeImage } />
					{ attributes.imageUrl &&
						<TextareaControl
							label={ __( 'Alt text', 'build-n-bloom-blocks' ) }
							help={ __( 'Describe the image for people who can\'t see it. Leave empty if it is decorative.', 'build-n-bloom-blocks' ) }
							value={ attributes.imageAlt }
							onChange={ ( imageAlt ) => setAttributes( { imageAlt } ) } />
					}
					<LinkControl attributes={ attributes } setAttributes={ setAttributes } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="bnb-card__inner">
					<div className="bnb-card__media">
						{ attributes.imageUrl
							? <img src={ attributes.imageUrl } alt={ attributes.imageAlt } />
							: <MediaPlaceholder
								icon="format-image"
								labels={ { title: __( 'Card image', 'build-n-bloom-blocks' ) } }
								accept="image/*"
								allowedTypes={ [ 'image' ] }
								onSelect={ onSelectImage } />
						}
					</div>
					<div className="bnb-card__body">
						<RichText
							tagName="h3"
							className="bnb-card__title"
							placeholder={ __( 'Card title…', 'build-n-bloom-blocks' ) }
							value={ attributes.title }
							onChange={ ( title ) => setAttributes( { title } ) } />
						<RichText
							tagName="p"
							className="bnb-card__text"
							placeholder={ __( 'Optional text…', 'build-n-bloom-blocks' ) }
							value={ attributes.text }
							onChange={ ( text ) => setAttributes( { text } ) } />
					</div>
				</div>
			</div>
		</>
	);
}
