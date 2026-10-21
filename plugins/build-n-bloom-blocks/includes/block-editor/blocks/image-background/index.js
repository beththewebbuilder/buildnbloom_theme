import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { SelectControl, RangeControl, Button } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import './style.scss';
import '../../block-editor-group.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import save from './save';
import json from './block.json';

const { name, attributes, ...settings } = json;

/** TO DO: Add image 
 * Add video text location (centre, bottom)
*/
 
// inner content settings
const ALLLOWED_BLOCKS = ['core/group'];
const BLOCK_TEMPLATE = [
  ['core/group', {}, [
    ['core/group', { className: 'image-background-content' }, [
        ['core/group', { className: 'content-center-container' }, [
			['core/group', { className: 'content-center' }, [
				['core/heading', { level: 1, placeholder: 'Main heading...'}],
				['core/heading', { level: 2, placeholder: 'Subheading...'}],
				['core/button'],
			]]
        ]]
    ]],
]]];

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
	function onSetTopPadding( paddingTopValue ) {
		setAttributes( { paddingTop: paddingTopValue } );
	}
	function onSetBottomPadding( paddingBottomValue ) {
		setAttributes( { paddingBottom: paddingBottomValue } );
	}
	function onOpacityColourChange( newColour ) {
        setAttributes( { opacityColour: newColour } )
	}
	function onChangeOpacityPercent( newPercentage ) {
		setAttributes( { backgroundOpacityPercent: newPercentage } );
	}
	function onChangeDesktopImagePosition( newDesktopPosition ) {
		setAttributes( { desktopImagePosition: newDesktopPosition } );
	}
	function onChangeMobileImagePosition( newMobilePosition ) {
		setAttributes( { mobileImagePosition: newMobilePosition } );
	}
	function onChangeDesktopContentPosition( newDesktopContentPosition ) {
		setAttributes( { desktopContentPosition: newDesktopContentPosition } );
	}
	function onChangeMobileContentPosition( newMobileContentPosition ) {
		setAttributes( { mobileContentPosition: newMobileContentPosition } );
	}
	function onSelectDesktopMedia(newImage) {
		setAttributes({
			desktopImageId: newImage.id,
			desktopImageTitle: newImage.title,
			desktopImageUrl: newImage.url
		});
	}
	function removeDesktopMedia() {
		setAttributes({
			desktopImageId: 0,
			desktopImageTitle: "",
			desktopImageUrl: ""
		});
	}
	function onSelectMobileMedia(newImage) {
		setAttributes({
			mobileImageId: newImage.id,
			mobileImageTitle: newImage.title,
			mobileImageUrl: newImage.url
		});
	}
	function removeMobileMedia() {
		setAttributes({
			mobileImageId: 0,
			mobileImageTitle: "",
			mobileImageUrl: ""
		});
	}

	const blockStyle = {
		backgroundImage: attributes.desktopImageUrl != '' ? 'url("' + attributes.desktopImageUrl + '")' : 'none'
	};

	return (
		<div { ...useBlockProps() }>
		<Fragment>
			<InspectorControls group="position">
				<div className="full-width-control-wrapper">
					<div className="custom-label">Desktop background image</div>
					<div><em>{attributes.desktopImageTitle}</em></div>
					{attributes.desktopImageId == 0 &&
						<MediaUploadCheck>
							<MediaUpload
								title="Select desktop background"
								value={ attributes.desktopImageId }
								onSelect={ onSelectDesktopMedia }
								allowedTypes={['image', 'video']}
								render={ ({open}) => (
								<Button onClick={open} variant="primary" isLarge>
									{ attributes.desktopImageId == 0 && __('Choose an image', 'build-n-bloom-blocks')}
								</Button>
								)}/>
						</MediaUploadCheck>
					}					
					<div className="flex-container">
						{attributes.desktopImageId != 0 && 
							<MediaUploadCheck>
								<MediaUpload
									title={__('Replace image', 'build-n-bloom-blocks')}
									value={attributes.desktopImageId}
									onSelect={ onSelectDesktopMedia }
									allowedTypes={['image', 'video']}
									render={({open}) => (
										<Button className="flex-item" onClick={open} variant="secondary" isLarge>{__('Replace', 'build-n-bloom-blocks')}</Button>
									)}
								/>
							</MediaUploadCheck>
						}
						{attributes.desktopImageId != 0 && 
							<MediaUploadCheck>
								<Button className="flex-item" onClick={ removeDesktopMedia } variant="secondary" isDestructive>{__('Remove', 'build-n-bloom-blocks')}</Button>
							</MediaUploadCheck>
						}
					</div>
				</div>

				<div className="full-width-control-wrapper">
					<div className="custom-label">Mobile background image</div>
					<div><em>{ attributes.mobileImageTitle }</em></div>
					{ attributes.mobileImageId == 0 &&
						<MediaUploadCheck>
							<MediaUpload
								title="Select mobile background"
								value={ attributes.mobileImageId }
								onSelect={ onSelectMobileMedia }
								allowedTypes={['image', 'video']}
								render={ ({open}) => (
								<Button onClick={open} variant="primary" isLarge>
									{ attributes.mobileImageId == 0 && __('Choose an image', 'build-n-bloom-blocks')}
								</Button>
								)}/>
						</MediaUploadCheck>
					}					
					<div className="flex-container">
						{ attributes.mobileImageId != 0 && 
							<MediaUploadCheck>
								<MediaUpload
									title={__('Replace image', 'build-n-bloom-blocks')}
									value={attributes.mobileImageId}
									onSelect={ onSelectMobileMedia }
									allowedTypes={['image', 'video']}
									render={({open}) => (
										<Button className="flex-item" onClick={open} variant="secondary" isLarge>{__('Replace', 'build-n-bloom-blocks')}</Button>
									)}
								/>
							</MediaUploadCheck>
						}
						{attributes.mobileImageId != 0 && 
							<MediaUploadCheck>
								<Button className="flex-item" onClick={ removeMobileMedia } variant="secondary" isDestructive>{__('Remove', 'build-n-bloom-blocks')}</Button>
							</MediaUploadCheck>
						}
					</div>
				</div>

				<div className="full-width-control-wrapper">
					<RangeControl
						label="Padding top (rem)"
						value={ attributes.paddingTop }
						onChange={ onSetTopPadding }
						min={0}
						max={5}
						step={1} />
				</div>
				<div className="full-width-control-wrapper">
					<RangeControl
						label="Padding bottom (rem)"
						value={ attributes.paddingBottom }
						onChange={ onSetBottomPadding }
						min={0}
						max={5}
						step={1} />
				</div>
				<div className="full-width-control-wrapper">
					<SelectControl
						label="Image postition (desktop)"
						value={ attributes.desktopImagePosition }
						options={[
							{ label: 'Top', value: 'top' },
							{ label: 'Middle', value: 'middle' },
							{ label: 'Bottom', value: 'bottom' }
						]}
						onChange={ onChangeDesktopImagePosition } />
				</div>
				<div className="full-width-control-wrapper">
					<SelectControl
						label="Image postition (mobile)"
						value={ attributes.mobileImagePosition }
						options={[
							{ label: 'Top', value: 'top' },
							{ label: 'Middle', value: 'middle' },
							{ label: 'Bottom', value: 'bottom' }
						]}
						onChange={ onChangeMobileImagePosition } />
				</div>
				<div className="full-width-control-wrapper">
					<SelectControl
						label="Content postition (desktop)"
						value={ attributes.desktopContentPosition }
						options={[
							{ label: 'Top', value: 'top' },
							{ label: 'Middle', value: 'middle' },
							{ label: 'Bottom', value: 'bottom' }
						]}
						onChange={ onChangeDesktopContentPosition } />
				</div>
				<div className="full-width-control-wrapper">
					<SelectControl
						label="Content postition (mobile)"
						value={ attributes.mobileContentPosition }
						options={[
							{ label: 'Top', value: 'top' },
							{ label: 'Middle', value: 'middle' },
							{ label: 'Bottom', value: 'bottom' }
						]}
						onChange={ onChangeMobileContentPosition } />
				</div>
			</InspectorControls>
			
			<InspectorControls group="color">
				<div className="full-width-control-wrapper">
					<SelectControl
						label="Select opacity colour"
						value={ attributes.opacityColour }
						options={[
							{ label: 'White', value: 'white'},
							{ label: 'Black', value: 'black' }
						]}
						onChange={ onOpacityColourChange }/>
				</div>
				<div className="full-width-control-wrapper">
					<RangeControl
						label="Opacity %"
						value={ attributes.backgroundOpacityPercent }
						onChange={ onChangeOpacityPercent }
						min={0}
						max={100}
						step={5}/>
				</div>
			</InspectorControls>

			<InspectorControls group="dimensions">
				<div className="full-width-control-wrapper">
					<RangeControl
						label="Desktop height (%)"
						value={ attributes.containerHeight }
						onChange={ onSetContainerHeight }
						min={5}
						max={100}
						step={5}/>
				</div>
				<div className="full-width-control-wrapper">
					<RangeControl
						label="Mobile height (%)"
						value={ attributes.mobileHeight }
						onChange={ onSetMobileContainerHeight }
						min={5}
						max={100}
						step={5}/>
				</div>				
			</InspectorControls>
		</Fragment>

        <div className="image-background-block custom-block" 
			data-mobile-container-height={attributes.mobileHeight}
			data-top-padding={attributes.paddingTop}
			data-bottom-padding={attributes.paddingBottom}
			
			data-mobile-image-position={attributes.mobileImagePosition}
			data-desktop-content-position={attributes.desktopContentPosition}
			data-mobile-content-position={attributes.mobileContentPosition}>


			<div className="background-image" 
				style={blockStyle}
				data-container-height={attributes.containerHeight}
				data-desktop-image-position={attributes.desktopImagePosition}>

				<div className="image-overlay"
					data-background-opacity={attributes.opacityColour}
					data-opacity-percentage={attributes.backgroundOpacityPercent}>
				</div>

				<InnerBlocks 
					allowedBlocks={ ALLLOWED_BLOCKS } 
					template={ BLOCK_TEMPLATE } 
					templateLock="all"
					templateInsertUpdatesSelection={false}
					renderAppender={ InnerBlocks.DefaultBlockAppender } />
			</div>
			
        </div>
		</div>
	);
	},
	save
});