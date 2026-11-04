import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: 'luffman-seg__button',
		type: 'button',
		'aria-pressed': 'false',
		'data-value': attributes.value || undefined,
		'data-summary': attributes.summary || undefined,
		'data-no-summary': attributes.noSummary ? 'true' : undefined,
		'data-note': attributes.note || undefined,
		'data-stage-note': attributes.stageNote || undefined,
		'data-image': attributes.image || undefined,
		'data-mode': attributes.imageMode === 'photo' ? 'photo' : undefined,
		'data-trim': attributes.trim || undefined,
		'data-invert': attributes.invert ? 'true' : undefined,
		'data-photos': attributes.photos.length ? JSON.stringify( attributes.photos ) : undefined,
		'data-text-prompt': attributes.textPrompt || undefined,
		'data-text-placeholder': attributes.textPlaceholder || undefined,
		'data-text-use': attributes.textPrompt && attributes.textUse === 'enquiry' ? 'enquiry' : undefined,
		'data-upload-label': attributes.uploadLabel || undefined,
		'data-upload-help': attributes.uploadHelp || undefined,
	} );

	return (
		<button { ...blockProps }>
			<RichText.Content value={ attributes.label } />
		</button>
	);
}
