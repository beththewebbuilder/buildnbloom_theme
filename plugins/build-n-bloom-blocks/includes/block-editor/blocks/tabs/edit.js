import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';

// Only tabs can go in the tab container
const ALLOWED_BLOCKS = [ 'build-n-bloom-blocks/tab' ];
const TEMPLATE = [
	[ 'build-n-bloom-blocks/tab', { title: __( 'Tab 1', 'build-n-bloom-blocks' ) } ],
	[ 'build-n-bloom-blocks/tab', { title: __( 'Tab 2', 'build-n-bloom-blocks' ) } ],
];

export default function Edit() {
	const blockProps = useBlockProps();
	// In the editor every tab is shown stacked so all of them can be edited; the tab buttons are built on the front end
	const innerBlocksProps = useInnerBlocksProps( { className: 'bnb-tabs__panels' }, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />
		</div>
	);
}
