import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, TextareaControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Option settings', 'luffman-blocks' ) }>
					<TextControl
						label={ __( 'Name in the summary', 'luffman-blocks' ) }
						help={ __( 'Optional. A longer name for the summary and enquiry.', 'luffman-blocks' ) }
						value={ attributes.summary }
						onChange={ ( summary ) => setAttributes( { summary } ) } />
					<TextareaControl
						label={ __( 'Note', 'luffman-blocks' ) }
						help={ __( 'Optional. Shown under the summary when this is chosen.', 'luffman-blocks' ) }
						value={ attributes.note }
						onChange={ ( note ) => setAttributes( { note } ) } />
					<TextControl
						label={ __( 'Value', 'luffman-blocks' ) }
						help={ __( 'Used by drawn previews. Leave as it is if unsure.', 'luffman-blocks' ) }
						value={ attributes.value }
						onChange={ ( value ) => setAttributes( { value } ) } />
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={ [ 'image' ] }
							onSelect={ ( media ) => setAttributes( { image: media.url } ) }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ attributes.image ? __( 'Replace preview image', 'luffman-blocks' ) : __( 'Add preview image', 'luffman-blocks' ) }
								</Button>
							) } />
					</MediaUploadCheck>
					{ attributes.image &&
						<Button variant="link" isDestructive onClick={ () => setAttributes( { image: '' } ) }>
							{ __( 'Remove image', 'luffman-blocks' ) }
						</Button>
					}
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<RichText
					tagName="span"
					placeholder={ __( 'Option…', 'luffman-blocks' ) }
					allowedFormats={ [] }
					value={ attributes.label }
					onChange={ ( label ) => setAttributes( { label } ) } />
			</div>
		</>
	);
}
