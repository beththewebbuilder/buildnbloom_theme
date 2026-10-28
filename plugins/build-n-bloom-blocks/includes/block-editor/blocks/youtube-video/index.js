import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';
import './style.scss';
import '../../block-editor-group.scss';

// Internal dependencies
import save from './save';
import deprecated from './deprecated';
import json from './block.json';

const { name, attributes, ...settings } = json;

/** TO DO: Add image 
 * Add image location (centre, top, bottom)
 * Add video text location (centre, bottom)
 * Add image opacity
*/

// inner content settings
const ALLLOWED_BLOCKS = ['core/group'];
const BLOCK_TEMPLATE = [
    ['core/group', {}, [
        ['core/heading', { placeholder: 'Video name; e.g. Joe and Jane Bloggs // Wedding location' }],
        ['core/image', { className: 'no-padding' }],
    ] ]
];

registerBlockType(name, {
	...settings,
	edit: ({ attributes, setAttributes }) => {

	// custom functions
	function onSetContainerHeight( containerHeightValue ) {
		setAttributes( { containerHeight: containerHeightValue } );
	}
	function onSetMobileContainerHeight( mobileContainerHeightValue ) {
		setAttributes( { mobileHeight: mobileContainerHeightValue } );
	}
	// Accepts a full YouTube/Vimeo link or just the video ID
	function onVideoChange( videoValue ) {
		if ( attributes.videoProvider === 'vimeo' ) {
			var vimeoMatch = videoValue.match( /vimeo\.com\/(?:video\/)?(\d+)/ );
			setAttributes( { vimeoId: vimeoMatch ? vimeoMatch[1] : videoValue.trim() } );
			return;
		}
		var youTubeMatch = videoValue.match( /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/ );
		setAttributes( { youTubeId: youTubeMatch ? youTubeMatch[1] : videoValue.trim() } );
	}
	function onSetPadding( addPaddingValue ) {
		setAttributes( { addPadding: addPaddingValue } );
	}

	return (
		<div {...useBlockProps()}>
        <InspectorControls style={ { marginBottom: '40px'} }>
          <PanelBody title={'Video Settings'}>
		  <RangeControl
					label="Background height"
					value={ attributes.containerHeight }
					onChange={ onSetContainerHeight }
					min={5}
					max={100}
					step={5}/>
			<RangeControl
				label="Mobile background height"
				value={ attributes.mobileHeight }
				onChange={ onSetMobileContainerHeight }
				min={5}
				max={100}
				step={5}/>
			<ToggleControl
				label="Padding top and bottom (3rem)"
				checked={ attributes.addPadding }
				onChange={ onSetPadding }
			/>
			<SelectControl
				label="Video from"
				value={ attributes.videoProvider }
				options={[
					{ label: 'YouTube', value: 'youtube' },
					{ label: 'Vimeo', value: 'vimeo' }
				]}
				onChange={ ( videoProvider ) => setAttributes( { videoProvider } ) }/>
            <PanelRow>
                <TextControl
                label={ attributes.videoProvider === 'vimeo' ? 'Vimeo link or ID' : 'YouTube link or ID' }
                value={ attributes.videoProvider === 'vimeo' ? attributes.vimeoId : attributes.youTubeId }
                onChange={ onVideoChange }/>
            </PanelRow>
          </PanelBody>
        </InspectorControls>

        <div className="video-container custom-block">
		  <InnerBlocks 
            allowedBlocks={ ALLLOWED_BLOCKS } 
            template={ BLOCK_TEMPLATE } 
            templateLock="all"
            templateInsertUpdatesSelection={false}
            renderAppender={ InnerBlocks.DefaultBlockAppender }
          />
        </div>
		</div>
	);
	},
	save,
	deprecated
});