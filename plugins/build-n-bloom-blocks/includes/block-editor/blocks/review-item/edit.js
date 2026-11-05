import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaPlaceholder, RichText } from '@wordpress/block-editor';
import { FocalPointPicker, PanelBody, TextareaControl } from '@wordpress/components';
import MediaControl from '../../components/media-control';
import LinkControl from '../../components/link-control';
import { reviewStyle } from './save';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { style: reviewStyle( attributes ) } );

	// A new image starts centred, as the old focal point was for a different picture
	function onSelectImage( image ) {
		setAttributes( { imageId: image.id, imageUrl: image.url, imageAlt: image.alt || '', focalPoint: undefined } );
	}
	function removeImage() {
		setAttributes( { imageId: 0, imageUrl: '', imageAlt: '', focalPoint: undefined } );
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
						<FocalPointPicker
							label={ __( 'Focal point', 'build-n-bloom-blocks' ) }
							help={ __( 'The part of the image that stays in view when it is cropped, e.g. the person\'s face.', 'build-n-bloom-blocks' ) }
							url={ attributes.imageUrl }
							value={ attributes.focalPoint }
							onChange={ ( focalPoint ) => setAttributes( { focalPoint } ) } />
					}
					{ attributes.imageUrl &&
						<TextareaControl
							label={ __( 'Alt text', 'build-n-bloom-blocks' ) }
							help={ __( 'E.g. the company name for a logo, or the person\'s name for a photo.', 'build-n-bloom-blocks' ) }
							value={ attributes.imageAlt }
							onChange={ ( imageAlt ) => setAttributes( { imageAlt } ) } />
					}
				</PanelBody>
				<PanelBody title={ __( 'Link', 'build-n-bloom-blocks' ) }>
					<LinkControl
						label={ __( 'Link, e.g. to the case study (optional)', 'build-n-bloom-blocks' ) }
						attributes={ attributes }
						setAttributes={ setAttributes } />
					{ attributes.linkUrl &&
						<p className="components-base-control__help">{ __( 'Type the link text under the review.', 'build-n-bloom-blocks' ) }</p>
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
				{ attributes.linkUrl &&
					<RichText
						tagName="span"
						className="bnb-review__link"
						placeholder={ __( 'Link text, e.g. Read the case study…', 'build-n-bloom-blocks' ) }
						value={ attributes.linkText }
						onChange={ ( linkText ) => setAttributes( { linkText } ) }
						allowedFormats={ [] }
						withoutInteractiveFormatting />
				}
			</div>
		</>
	);
}
