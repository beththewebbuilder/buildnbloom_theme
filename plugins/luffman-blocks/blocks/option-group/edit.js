import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, InnerBlocks, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'luffman-blocks/product-option' ];
const TEMPLATE = [ [ 'luffman-blocks/product-option' ], [ 'luffman-blocks/product-option' ] ];

export default function Edit( { attributes, setAttributes } ) {
	const innerBlocksProps = useInnerBlocksProps( { className: 'luffman-seg' }, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		orientation: 'horizontal',
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Group settings', 'luffman-blocks' ) }>
					<TextControl
						label={ __( 'Key', 'luffman-blocks' ) }
						help={ __( 'A short word used by drawn previews, such as size. Leave as it is if unsure.', 'luffman-blocks' ) }
						value={ attributes.key }
						onChange={ ( key ) => setAttributes( { key } ) } />
					<ToggleControl
						label={ __( 'Optional', 'luffman-blocks' ) }
						help={ __( 'Nothing is chosen at first, and clicking a chosen option clears it. Good for add-ons.', 'luffman-blocks' ) }
						checked={ attributes.optional }
						onChange={ ( optional ) => setAttributes( { optional } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<RichText
					tagName="p"
					className="luffman-control-label"
					placeholder={ __( 'Group name, e.g. Size…', 'luffman-blocks' ) }
					allowedFormats={ [] }
					value={ attributes.label }
					onChange={ ( label ) => setAttributes( { label } ) } />
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
