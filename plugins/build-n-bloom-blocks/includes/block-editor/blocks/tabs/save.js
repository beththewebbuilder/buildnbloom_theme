import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<div { ...useBlockProps.save() }>
			{ /* Tab buttons are added here by view.js from each tab's title */ }
			<div className="bnb-tabs__list" role="tablist"></div>
			<div { ...useInnerBlocksProps.save( { className: 'bnb-tabs__panels' } ) } />
		</div>
	);
}
