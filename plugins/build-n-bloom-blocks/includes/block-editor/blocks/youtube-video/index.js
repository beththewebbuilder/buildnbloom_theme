import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl, RangeControl, ToggleControl } from '@wordpress/components';
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
	function onYouTubeIdChange( videoIdValue ) {
		var trimedVideoId = videoIdValue.replace("https://youtu.be/", "");
		setAttributes( { youTubeId: trimedVideoId } )
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
            <PanelRow>
                <TextControl 
                label="YouTube"
                value={ attributes.youTubeId }
                onChange={ onYouTubeIdChange }/>
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