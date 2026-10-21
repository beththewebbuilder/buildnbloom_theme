import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';

// The tab content can be any blocks
const TEMPLATE = [
	[ 'core/paragraph', { placeholder: __( 'Tab content…', 'build-n-bloom-blocks' ) } ],
];

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( { className: 'bnb-tab__content' }, { template: TEMPLATE } );

	return (
		<div { ...blockProps }>
			<RichText
				tagName="h3"
				className="bnb-tab__title"
				placeholder={ __( 'Tab title…', 'build-n-bloom-blocks' ) }
				allowedFormats={ [] }
				value={ attributes.title }
				onChange={ ( title ) => setAttributes( { title } ) } />
			<div { ...innerBlocksProps } />
		</div>
	);
}
