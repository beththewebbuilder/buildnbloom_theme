import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { cssVariables } from '../../utils';

// Settings are passed to the stylesheet as CSS custom properties
export function gridStyle( attributes ) {
	return cssVariables( {
		'--bnb-grid-columns': attributes.columns,
		'--bnb-grid-columns-tablet': attributes.tabletColumns,
		'--bnb-grid-columns-mobile': attributes.mobileColumns,
		'--bnb-card-aspect-ratio': attributes.aspectRatio,
	} );
}

export default function save( { attributes } ) {
	return <div { ...useInnerBlocksProps.save( useBlockProps.save( { style: gridStyle( attributes ) } ) ) } />;
}
