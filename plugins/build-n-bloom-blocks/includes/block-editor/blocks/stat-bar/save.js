import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { cssVariables } from '../../utils';

// Settings are passed to the stylesheet as CSS custom properties
export function statBarStyle( attributes ) {
	return cssVariables( {
		'--bnb-stats-columns': attributes.columns,
		'--bnb-stats-columns-tablet': attributes.tabletColumns,
		'--bnb-stats-columns-mobile': attributes.mobileColumns,
	} );
}

export default function save( { attributes } ) {
	return (
		<div { ...useBlockProps.save( { style: statBarStyle( attributes ) } ) }>
			<ul { ...useInnerBlocksProps.save( { className: 'bnb-stats__items' } ) } />
		</div>
	);
}
