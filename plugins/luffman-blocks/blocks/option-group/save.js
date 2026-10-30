import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: 'luffman-config__group',
		'data-key': attributes.key,
		'data-optional': attributes.optional ? 'true' : undefined,
	} );

	return (
		<fieldset { ...blockProps }>
			<RichText.Content tagName="legend" className="luffman-control-label" value={ attributes.label } />
			<div { ...useInnerBlocksProps.save( { className: 'luffman-seg' } ) } />
		</fieldset>
	);
}
