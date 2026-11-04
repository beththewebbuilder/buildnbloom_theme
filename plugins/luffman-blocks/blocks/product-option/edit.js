import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl, TextareaControl, ToggleControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	function onSelectPhotos( media ) {
		setAttributes( {
			photos: media.map( ( item ) => ( { id: item.id, url: item.url, alt: item.alt || '', caption: item.caption || '' } ) ),
		} );
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Pattern or preview image', 'luffman-blocks' ) }>
					{ attributes.image && <img src={ attributes.image } alt="" style={ { display: 'block', width: '100%', marginBottom: '0.5rem', background: '#fff' } } /> }
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={ [ 'image' ] }
							onSelect={ ( media ) => setAttributes( { image: media.url } ) }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ attributes.image ? __( 'Replace image', 'luffman-blocks' ) : __( 'Upload image', 'luffman-blocks' ) }
								</Button>
							) } />
					</MediaUploadCheck>
					{ attributes.image &&
						<Button variant="link" isDestructive onClick={ () => setAttributes( { image: '' } ) }>
							{ __( 'Remove image', 'luffman-blocks' ) }
						</Button>
					}
					{ attributes.image &&
						<>
							<SelectControl
								label={ __( 'Firepit preview uses this as', 'luffman-blocks' ) }
								value={ attributes.imageMode }
								options={ [
									{ label: __( 'Flat artwork, wrapped around the drum', 'luffman-blocks' ), value: 'wrap' },
									{ label: __( 'Finished photo or render, shown as it is', 'luffman-blocks' ), value: 'photo' },
								] }
								onChange={ ( imageMode ) => setAttributes( { imageMode } ) } />
							{ attributes.imageMode !== 'photo' &&
								<>
									<ToggleControl
										label={ __( 'Cut out the dark areas', 'luffman-blocks' ) }
										help={ __( 'Off: white areas are cut out. On: black areas are cut out.', 'luffman-blocks' ) }
										checked={ attributes.invert }
										onChange={ ( invert ) => setAttributes( { invert } ) } />
									<TextControl
										label={ __( 'Trim border (%)', 'luffman-blocks' ) }
										help={ __( 'Optional. Plain border to ignore: left, right, top, bottom. For example 3, 2, 11, 4.', 'luffman-blocks' ) }
										value={ attributes.trim }
										onChange={ ( trim ) => setAttributes( { trim } ) } />
								</>
							}
						</>
					}
				</PanelBody>
				<PanelBody title={ __( 'Text', 'luffman-blocks' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Name in the summary', 'luffman-blocks' ) }
						help={ __( 'Optional. A longer name for the summary and enquiry.', 'luffman-blocks' ) }
						value={ attributes.summary }
						onChange={ ( summary ) => setAttributes( { summary } ) } />
					<ToggleControl
						label={ __( 'Leave out of the summary', 'luffman-blocks' ) }
						checked={ attributes.noSummary }
						onChange={ ( noSummary ) => setAttributes( { noSummary } ) } />
					<TextareaControl
						label={ __( 'Note', 'luffman-blocks' ) }
						help={ __( 'Optional. Shown with the choices when this is selected.', 'luffman-blocks' ) }
						value={ attributes.note }
						onChange={ ( note ) => setAttributes( { note } ) } />
					<TextareaControl
						label={ __( 'Note under the preview', 'luffman-blocks' ) }
						value={ attributes.stageNote }
						onChange={ ( stageNote ) => setAttributes( { stageNote } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Photos', 'luffman-blocks' ) } initialOpen={ false }>
					<p>{ __( 'Added to the preview slider when this option is selected. Captions and alt text come from the Media Library.', 'luffman-blocks' ) }</p>
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={ [ 'image' ] }
							multiple
							gallery={ false }
							value={ attributes.photos.map( ( photo ) => photo.id ).filter( Boolean ) }
							onSelect={ onSelectPhotos }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ attributes.photos.length ? __( 'Change photos', 'luffman-blocks' ) : __( 'Add photos', 'luffman-blocks' ) }
								</Button>
							) } />
					</MediaUploadCheck>
				</PanelBody>
				<PanelBody title={ __( 'Ask the visitor', 'luffman-blocks' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Question', 'luffman-blocks' ) }
						help={ __( 'Optional. Shows a text box when this option is selected.', 'luffman-blocks' ) }
						value={ attributes.textPrompt }
						onChange={ ( textPrompt ) => setAttributes( { textPrompt } ) } />
					{ attributes.textPrompt &&
						<>
							<TextControl
								label={ __( 'Example text', 'luffman-blocks' ) }
								value={ attributes.textPlaceholder }
								onChange={ ( textPlaceholder ) => setAttributes( { textPlaceholder } ) } />
							<SelectControl
								label={ __( 'Their answer', 'luffman-blocks' ) }
								value={ attributes.textUse }
								options={ [
									{ label: __( 'Replaces this option in the summary (short)', 'luffman-blocks' ), value: 'summary' },
									{ label: __( 'Is added to the enquiry message (long)', 'luffman-blocks' ), value: 'enquiry' },
								] }
								onChange={ ( textUse ) => setAttributes( { textUse } ) } />
						</>
					}
					<TextControl
						label={ __( 'Upload heading', 'luffman-blocks' ) }
						help={ __( 'Optional. Lets visitors upload their own artwork to the drawn preview.', 'luffman-blocks' ) }
						value={ attributes.uploadLabel }
						onChange={ ( uploadLabel ) => setAttributes( { uploadLabel } ) } />
					{ attributes.uploadLabel &&
						<TextControl
							label={ __( 'Upload help text', 'luffman-blocks' ) }
							value={ attributes.uploadHelp }
							onChange={ ( uploadHelp ) => setAttributes( { uploadHelp } ) } />
					}
				</PanelBody>
				<PanelBody title={ __( 'Advanced', 'luffman-blocks' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Value', 'luffman-blocks' ) }
						help={ __( 'Used by drawn previews. Leave as it is if unsure.', 'luffman-blocks' ) }
						value={ attributes.value }
						onChange={ ( value ) => setAttributes( { value } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				{ attributes.image && <img className="luffman-option-thumb" src={ attributes.image } alt="" /> }
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
