import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';
import AddBlockButton from '../../components/add-block-button';
import { gridStyle, gridClassName, GAP_SCALE } from './save';

// Only Grid Cards can be added to the grid
export const ALLOWED_BLOCKS = [ 'build-n-bloom-blocks/grid-card' ];
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

const CARD_HEIGHTS = [
	{ label: __( 'Use image shape', 'build-n-bloom-blocks' ), value: '' },
	{ label: __( 'Small', 'build-n-bloom-blocks' ), value: 'small' },
	{ label: __( 'Medium', 'build-n-bloom-blocks' ), value: 'medium' },
	{ label: __( 'Large', 'build-n-bloom-blocks' ), value: 'large' },
];

const CARD_STYLES = [
	{ label: __( 'Text below image', 'build-n-bloom-blocks' ), value: 'stacked' },
	{ label: __( 'Text over image on hover', 'build-n-bloom-blocks' ), value: 'overlay' },
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const blockProps = useBlockProps( {
		className: [ 'bnb-editor-container', gridClassName( attributes ) ].filter( Boolean ).join( ' ' ),
		style: gridStyle( attributes ),
	} );
	const innerBlocksProps = useInnerBlocksProps( { className: 'bnb-grid__items' }, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		orientation: 'horizontal',
		renderAppender: () => <AddBlockButton rootClientId={ clientId } label={ __( 'Add new card', 'build-n-bloom-blocks' ) } />,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Grid settings', 'build-n-bloom-blocks' ) }>
					<ToggleControl
						label={ __( 'Full width of page', 'build-n-bloom-blocks' ) }
						help={ __( 'Turn off to keep the grid within the page container.', 'build-n-bloom-blocks' ) }
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
					<RangeControl
						label={ __( 'Space between cards', 'build-n-bloom-blocks' ) }
						value={ attributes.gap }
						onChange={ ( gap ) => setAttributes( { gap } ) }
						min={ 0 }
						max={ GAP_SCALE.length - 1 }
						marks
						allowReset />
					<SelectControl
						label={ __( 'Card image height', 'build-n-bloom-blocks' ) }
						value={ attributes.cardHeight }
						options={ CARD_HEIGHTS }
						onChange={ ( cardHeight ) => setAttributes( { cardHeight } ) } />
					{ ! attributes.cardHeight &&
						<SelectControl
							label={ __( 'Card image shape', 'build-n-bloom-blocks' ) }
							value={ attributes.aspectRatio }
							options={ ASPECT_RATIOS }
							onChange={ ( aspectRatio ) => setAttributes( { aspectRatio } ) } />
					}
					<SelectControl
						label={ __( 'Card text position', 'build-n-bloom-blocks' ) }
						help={ attributes.cardStyle === 'overlay'
							? __( 'Text shows below the image in the editor so it can be edited. Check the hover effect on the live page.', 'build-n-bloom-blocks' )
							: undefined }
						value={ attributes.cardStyle }
						options={ CARD_STYLES }
						onChange={ ( cardStyle ) => setAttributes( { cardStyle } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<span className="bnb-editor-container__label">{ __( 'Item Grid', 'build-n-bloom-blocks' ) }</span>
				<div className="bnb-grid__header">
					<RichText
						tagName="h2"
						className="bnb-grid__heading"
						placeholder={ __( 'Optional heading…', 'build-n-bloom-blocks' ) }
						value={ attributes.heading }
						onChange={ ( heading ) => setAttributes( { heading } ) } />
					<RichText
						tagName="p"
						className="bnb-grid__intro"
						placeholder={ __( 'Optional intro text…', 'build-n-bloom-blocks' ) }
						value={ attributes.intro }
						onChange={ ( intro ) => setAttributes( { intro } ) } />
				</div>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
