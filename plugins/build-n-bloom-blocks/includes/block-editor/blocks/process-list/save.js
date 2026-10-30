import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export function processListClassName( attributes ) {
	return attributes.showNumbers ? undefined : 'bnb-process--no-numbers';
}

export default function save( { attributes } ) {
	return (
		<div { ...useBlockProps.save( { className: processListClassName( attributes ) } ) }>
			<ol { ...useInnerBlocksProps.save( { className: 'bnb-process__items' } ) } />
		</div>
	);
}
