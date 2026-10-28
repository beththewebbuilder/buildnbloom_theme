import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import json from './block.json';

const { name, attributes} = json;

function displayVideo(imageUrl) {
	if(imageUrl.endsWith('.mp4') || imageUrl.endsWith('.mov') || imageUrl.endsWith('.avi') || imageUrl.endsWith('.wmv') || imageUrl.endsWith('.avchd') || imageUrl.endsWith('.webm') || imageUrl.endsWith('.flv')) {
		return "";
	} 
	return "display: none";
}

export default function save({attributes}) {

	const blockStyle = {
		backgroundImage: attributes.desktopImageUrl != '' ? 'url("' + attributes.desktopImageUrl + '")' : 'none'
	};
	const mobileBlockStyle = {
		backgroundImage: attributes.mobileImageUrl != '' ? 'url("' + attributes.mobileImageUrl + '")' : 'none'
	};

	return (
		<div {...useBlockProps.save()} 
		data-class={"user-display"} 		
		data-desktop-content-position={attributes.desktopContentPosition}
		data-mobile-content-position={attributes.mobileContentPosition}>

			<div className="background-image" 
				style={blockStyle}
				data-container-height={attributes.containerHeight}
				data-desktop-image-position={attributes.desktopImagePosition}>
				<video autoplay muted loop style={displayVideo(attributes.desktopImageUrl)}>
					<source src={attributes.desktopImageUrl}></source>
				</video>
				<div className="image-overlay"
					data-background-opacity={attributes.opacityColour}
					data-opacity-percentage={attributes.backgroundOpacityPercent}
					data-top-padding={attributes.paddingTop}
					data-bottom-padding={attributes.paddingBottom}>
				</div>
				<InnerBlocks.Content/>
			</div>

			<div className="mobile-background-image" 
				style={mobileBlockStyle}
				data-mobile-container-height={attributes.mobileHeight}
				data-mobile-image-position={attributes.mobileImagePosition}>
				<video autoplay muted loop style={displayVideo(attributes.mobileImageUrl)}>
					<source src={attributes.mobileImageUrl}></source>
				</video>
				<div className="image-overlay"
					data-background-opacity={attributes.opacityColour}
					data-opacity-percentage={attributes.backgroundOpacityPercent}
					data-top-padding={attributes.paddingTop}
					data-bottom-padding={attributes.paddingBottom}>
				</div>
				<InnerBlocks.Content/>
			</div>
		</div>
	);
}