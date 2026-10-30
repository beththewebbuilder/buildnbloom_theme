import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: 'luffman-seg__button',
		type: 'button',
		'aria-pressed': 'false',
		'data-value': attributes.value || undefined,
		'data-summary': attributes.summary || undefined,
		'data-note': attributes.note || undefined,
		'data-image': attributes.image || undefined,
	} );

	return (
		<button { ...blockProps }>
			<RichText.Content value={ attributes.label } />
		</button>
	);
}
