import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import AddBlockButton from '../../components/add-block-button';
import { processListClassName } from './save';

const ALLOWED_BLOCKS = [ 'build-n-bloom-blocks/process-row' ];
const TEMPLATE = [
	[ 'build-n-bloom-blocks/process-row' ],
	[ 'build-n-bloom-blocks/process-row' ],
	[ 'build-n-bloom-blocks/process-row' ],
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const blockProps = useBlockProps( {
		className: [ 'bnb-editor-container', processListClassName( attributes ) ].filter( Boolean ).join( ' ' ),
	} );
	const innerBlocksProps = useInnerBlocksProps( { className: 'bnb-process__items' }, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		orientation: 'vertical',
		renderAppender: () => <AddBlockButton rootClientId={ clientId } label={ __( 'Add new row', 'build-n-bloom-blocks' ) } />,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Process list settings', 'build-n-bloom-blocks' ) }>
					<ToggleControl
						label={ __( 'Show numbers', 'build-n-bloom-blocks' ) }
						help={ __( 'Rows are numbered automatically, so they stay in order when moved.', 'build-n-bloom-blocks' ) }
						checked={ attributes.showNumbers }
						onChange={ ( showNumbers ) => setAttributes( { showNumbers } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<span className="bnb-editor-container__label">{ __( 'Process List', 'build-n-bloom-blocks' ) }</span>
				<ol { ...innerBlocksProps } />
			</div>
		</>
	);
}
