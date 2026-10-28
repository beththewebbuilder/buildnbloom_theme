import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	return (
		<div { ...useBlockProps.save() }>
			{ /* Shown as a heading without JS; view.js uses it as the tab button text */ }
			<RichText.Content tagName="h3" className="bnb-tab__title" value={ attributes.title } />
			<div { ...useInnerBlocksProps.save( { className: 'bnb-tab__content' } ) } />
		</div>
	);
}
