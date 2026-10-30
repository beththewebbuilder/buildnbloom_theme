import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, InnerBlocks, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'luffman-blocks/option-group' ];
const TEMPLATE = [ [ 'luffman-blocks/option-group' ] ];

const PREVIEWS = [
	{ label: __( 'Stacked images from the options', 'luffman-blocks' ), value: 'images' },
	{ label: __( 'Firepit drawing', 'luffman-blocks' ), value: 'firepit' },
	{ label: __( 'No preview', 'luffman-blocks' ), value: 'none' },
];

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'luffman-editor-box' } );
	const innerBlocksProps = useInnerBlocksProps( { className: 'luffman-config__groups' }, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Preview', 'luffman-blocks' ) }>
					<SelectControl
						label={ __( 'Preview type', 'luffman-blocks' ) }
						help={ __( 'Stacked images: give options an image, and the chosen images are layered in order. Use transparent PNGs. The firepit drawing needs the group keys pattern, size, material and plate.', 'luffman-blocks' ) }
						value={ attributes.preview }
						options={ PREVIEWS }
						onChange={ ( preview ) => setAttributes( { preview } ) } />
					<TextControl
						label={ __( 'Preview description', 'luffman-blocks' ) }
						help={ __( 'Read out by screen readers.', 'luffman-blocks' ) }
						value={ attributes.previewLabel }
						onChange={ ( previewLabel ) => setAttributes( { previewLabel } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Enquiry', 'luffman-blocks' ) }>
					<TextControl
						label={ __( 'Button text', 'luffman-blocks' ) }
						value={ attributes.ctaLabel }
						onChange={ ( ctaLabel ) => setAttributes( { ctaLabel } ) } />
					<TextControl
						label={ __( 'Button link', 'luffman-blocks' ) }
						help={ __( 'Usually the quote form, for example #quote or /contact/#quote.', 'luffman-blocks' ) }
						value={ attributes.ctaUrl }
						onChange={ ( ctaUrl ) => setAttributes( { ctaUrl } ) } />
					<TextControl
						label={ __( 'Start of the enquiry message', 'luffman-blocks' ) }
						help={ __( 'The chosen options are added after this in the quote form.', 'luffman-blocks' ) }
						value={ attributes.enquiryPrefix }
						onChange={ ( enquiryPrefix ) => setAttributes( { enquiryPrefix } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<span className="luffman-editor-box__label">{ __( 'Product Configurator', 'luffman-blocks' ) }</span>
				<RichText
					tagName="p"
					className="luffman-eyebrow"
					placeholder={ __( 'Small heading…', 'luffman-blocks' ) }
					allowedFormats={ [] }
					value={ attributes.eyebrow }
					onChange={ ( eyebrow ) => setAttributes( { eyebrow } ) } />
				<RichText
					tagName="h2"
					className="luffman-config__heading"
					placeholder={ __( 'Heading…', 'luffman-blocks' ) }
					allowedFormats={ [] }
					value={ attributes.heading }
					onChange={ ( heading ) => setAttributes( { heading } ) } />
				<div { ...innerBlocksProps } />
				<RichText
					tagName="p"
					className="luffman-config__price"
					placeholder={ __( 'Price, e.g. From £100…', 'luffman-blocks' ) }
					allowedFormats={ [] }
					value={ attributes.price }
					onChange={ ( price ) => setAttributes( { price } ) } />
			</div>
		</>
	);
}
