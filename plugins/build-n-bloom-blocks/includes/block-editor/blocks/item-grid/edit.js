import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { gridStyle } from './save';

// Only cards can go in the grid
export const ALLOWED_BLOCKS = [ 'build-n-bloom-blocks/grid-card', 'build-n-bloom-blocks/video-card' ];
const TEMPLATE = [
	[ 'build-n-bloom-blocks/grid-card' ],
	[ 'build-n-bloom-blocks/grid-card' ],
	[ 'build-n-bloom-blocks/grid-card' ],
];

export const ASPECT_RATIOS = [
	{ label: __( 'Original', 'build-n-bloom-blocks' ), value: 'auto' },
	{ label: __( 'Square (1:1)', 'build-n-bloom-blocks' ), value: '1/1' },
	{ label: __( 'Landscape (4:3)', 'build-n-bloom-blocks' ), value: '4/3' },
	{ label: __( 'Widescreen (16:9)', 'build-n-bloom-blocks' ), value: '16/9' },
	{ label: __( 'Portrait (3:4)', 'build-n-bloom-blocks' ), value: '3/4' },
];

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { style: gridStyle( attributes ) } );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		orientation: 'horizontal',
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Grid settings', 'build-n-bloom-blocks' ) }>
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
					<SelectControl
						label={ __( 'Card image shape', 'build-n-bloom-blocks' ) }
						value={ attributes.aspectRatio }
						options={ ASPECT_RATIOS }
						onChange={ ( aspectRatio ) => setAttributes( { aspectRatio } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
}
