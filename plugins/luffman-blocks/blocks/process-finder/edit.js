import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, InnerBlocks, RichText } from '@wordpress/block-editor';
import { PanelBody, TextareaControl, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'luffman-blocks/finder-process' ];
const TEMPLATE = [ [ 'luffman-blocks/finder-process' ] ];

function numberField( label, value, onChange, help ) {
	return (
		<TextControl
			label={ label }
			help={ help }
			type="number"
			value={ value }
			onChange={ ( text ) => onChange( Number( text ) || 0 ) } />
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'luffman-editor-box' } );
	const innerBlocksProps = useInnerBlocksProps( { className: 'luffman-finder__processes' }, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Choices', 'luffman-blocks' ) }>
					<TextareaControl
						label={ __( 'Materials (one per line)', 'luffman-blocks' ) }
						help={ __( 'If you rename a material, tick it again on each process.', 'luffman-blocks' ) }
						value={ attributes.materials.join( '\n' ) }
						onChange={ ( text ) => setAttributes( { materials: text.split( '\n' ) } ) } />
					<TextareaControl
						label={ __( 'Priorities (one per line)', 'luffman-blocks' ) }
						help={ __( 'If you rename a priority, set its ranking again on each process.', 'luffman-blocks' ) }
						value={ attributes.priorities.join( '\n' ) }
						onChange={ ( text ) => setAttributes( { priorities: text.split( '\n' ) } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Thickness slider (mm)', 'luffman-blocks' ) }>
					{ numberField( __( 'Lowest', 'luffman-blocks' ), attributes.minThickness, ( minThickness ) => setAttributes( { minThickness } ) ) }
					{ numberField( __( 'Highest', 'luffman-blocks' ), attributes.maxThickness, ( maxThickness ) => setAttributes( { maxThickness } ) ) }
					{ numberField( __( 'Starting value', 'luffman-blocks' ), attributes.defaultThickness, ( defaultThickness ) => setAttributes( { defaultThickness } ) ) }
				</PanelBody>
				<PanelBody title={ __( 'Messages', 'luffman-blocks' ) }>
					<TextareaControl
						label={ __( 'When no process matches', 'luffman-blocks' ) }
						value={ attributes.noMatch }
						onChange={ ( noMatch ) => setAttributes( { noMatch } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<span className="luffman-editor-box__label">{ __( 'Process Finder', 'luffman-blocks' ) }</span>
				<RichText
					tagName="p"
					className="luffman-eyebrow"
					placeholder={ __( 'Small heading…', 'luffman-blocks' ) }
					allowedFormats={ [] }
					value={ attributes.eyebrow }
					onChange={ ( eyebrow ) => setAttributes( { eyebrow } ) } />
				<RichText
					tagName="h2"
					className="luffman-finder__heading"
					placeholder={ __( 'Heading…', 'luffman-blocks' ) }
					allowedFormats={ [] }
					value={ attributes.heading }
					onChange={ ( heading ) => setAttributes( { heading } ) } />
				<ul { ...innerBlocksProps } />
				<RichText
					tagName="p"
					className="luffman-finder__note"
					placeholder={ __( 'Optional note under the result…', 'luffman-blocks' ) }
					value={ attributes.note }
					onChange={ ( note ) => setAttributes( { note } ) } />
			</div>
		</>
	);
}
