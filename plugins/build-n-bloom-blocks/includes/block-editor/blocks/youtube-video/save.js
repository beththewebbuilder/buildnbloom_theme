import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import json from './block.json';

const { name, attributes} = json;

export default function save({attributes}) {

	return (
		<div {...useBlockProps.save()} 
		data-class={"video-container-with-popup"}
		data-container-height={attributes.containerHeight} 
		data-mobile-container-height={attributes.mobileHeight}
		data-top-bottom-padding={attributes.addPadding}>
			<InnerBlocks.Content/>
			<div class="play-icon"><i class="fa-solid fa-play"></i></div>
            <div class="click-to-play">Click to play</div>
            <div class="video-container">
              <div class="close-video"><i class="fa-solid fa-xmark"></i> Close</div>
              <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + attributes.youTubeId + (attributes.youTubeId.includes('?') ? '&' : '?') + "enablejsapi=1"} id={"video_" + attributes.youTubeId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
		</div>
	);
}