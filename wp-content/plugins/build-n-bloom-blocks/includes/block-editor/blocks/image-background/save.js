import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import json from './block.json';

const { name, attributes} = json;

export default function save({attributes}) {

	return (
		<div {...useBlockProps.save()} 
		data-class={"user-display"} 
		data-container-height={attributes.containerHeight} 
		data-mobile-container-height={attributes.mobileHeight}
		data-background-opacity={attributes.opacityColour}
		data-top-padding={attributes.paddingTop}
		data-bottom-padding={attributes.paddingBottom}
		data-opacity-percentage={attributes.backgroundOpacityPercent}>
			<InnerBlocks.Content/>
		</div>
	);
}