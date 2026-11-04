import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import AddBlockButton from '../../components/add-block-button';
import { statBarStyle } from './save';

const ALLOWED_BLOCKS = [ 'build-n-bloom-blocks/stat-item' ];
const TEMPLATE = [
	[ 'build-n-bloom-blocks/stat-item' ],
	[ 'build-n-bloom-blocks/stat-item' ],
	[ 'build-n-bloom-blocks/stat-item' ],
	[ 'build-n-bloom-blocks/stat-item' ],
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const blockProps = useBlockProps( { className: 'bnb-editor-container', style: statBarStyle( attributes ) } );
	const innerBlocksProps = useInnerBlocksProps( { className: 'bnb-stats__items' }, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		orientation: 'horizontal',
		renderAppender: () => <AddBlockButton rootClientId={ clientId } label={ __( 'Add new stat', 'build-n-bloom-blocks' ) } />,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Stat bar settings', 'build-n-bloom-blocks' ) }>
					<ToggleControl
						label={ __( 'Full width background', 'build-n-bloom-blocks' ) }
						help={ __( 'The background runs across the whole screen and the stats stay in line with the page.', 'build-n-bloom-blocks' ) }
						checked={ attributes.align === 'full' }
						onChange={ ( isFull ) => setAttributes( { align: isFull ? 'full' : undefined } ) } />
					<RangeControl
						label={ __( 'Columns (desktop)', 'build-n-bloom-blocks' ) }
						value={ attributes.columns }
						onChange={ ( columns ) => setAttributes( { columns } ) }
						min={ 1 }
						max={ 6 } />
					<RangeControl
						label={ __( 'Columns (tablet)', 'build-n-bloom-blocks' ) }
						value={ attributes.tabletColumns }
						onChange={ ( tabletColumns ) => setAttributes( { tabletColumns } ) }
						min={ 1 }
						max={ 4 } />
					<RangeControl
						label={ __( 'Columns (mobile)', 'build-n-bloom-blocks' ) }
						value={ attributes.mobileColumns }
						onChange={ ( mobileColumns ) => setAttributes( { mobileColumns } ) }
						min={ 1 }
						max={ 2 } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<span className="bnb-editor-container__label">{ __( 'Stat Bar', 'build-n-bloom-blocks' ) }</span>
				<ul { ...innerBlocksProps } />
			</div>
		</>
	);
}
