import { __ } from '@wordpress/i18n';
import { useBlockProps, useSettings, InspectorControls, MediaPlaceholder, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	RadioControl,
	SelectControl,
	RangeControl,
	TextareaControl,
	TextControl,
	ToggleControl,
	FocalPointPicker,
	ColorPalette,
	FontSizePicker,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import MediaControl from '../../components/media-control';
import LinkControl from '../../components/link-control';
import MediaLayer, { mediaAttr, hasMobileMedia } from './media-layer';
import { heroClassName, heroStyle, typographyStyle, typographyClassName, showsPlayIcon, PlayIcon } from './save';
import { videoEmbedUrl } from '../../utils';

// Offered alongside the theme's fonts, so there is a choice on themes that don't define any
const STANDARD_FONTS = [
	{ label: __( 'Sans-serif (system)', 'build-n-bloom-blocks' ), value: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
	{ label: __( 'Serif', 'build-n-bloom-blocks' ), value: 'Georgia, "Times New Roman", Times, serif' },
	{ label: __( 'Monospace', 'build-n-bloom-blocks' ), value: 'ui-monospace, Menlo, Consolas, "Courier New", monospace' },
];

// Theme presets may come back as one list or split by origin
function presetList( presets ) {
	if ( Array.isArray( presets ) ) {
		return presets;
	}
	if ( presets && typeof presets === 'object' ) {
		return [ ...( presets.custom || [] ), ...( presets.theme || [] ), ...( presets.default || [] ) ];
	}
	return [];
}

// Percentage of the screen height
const HEIGHTS = [
	{ label: __( 'Full screen', 'build-n-bloom-blocks' ), value: '100' },
	{ label: __( '3/4 screen', 'build-n-bloom-blocks' ), value: '75' },
	{ label: __( '2/3 screen', 'build-n-bloom-blocks' ), value: '66.67' },
	{ label: __( '1/2 screen', 'build-n-bloom-blocks' ), value: '50' },
	{ label: __( '1/3 screen', 'build-n-bloom-blocks' ), value: '33.33' },
	{ label: __( '1/4 screen', 'build-n-bloom-blocks' ), value: '25' },
];

const OVERLAY_COLOURS = [
	{ name: __( 'Black', 'build-n-bloom-blocks' ), color: '#000000' },
	{ name: __( 'White', 'build-n-bloom-blocks' ), color: '#ffffff' },
];

// Sidebar controls for the desktop (no prefix) or mobile (prefix "mobile") image or video
function MediaSettings( { attributes, setAttributes, prefix = '', type } ) {
	const isMobile = prefix === 'mobile';
	const get = ( name ) => attributes[ mediaAttr( prefix, name ) ];
	function set( values ) {
		const prefixed = {};
		Object.keys( values ).forEach( ( name ) => {
			prefixed[ mediaAttr( prefix, name ) ] = values[ name ];
		} );
		setAttributes( prefixed );
	}

	if ( type === 'video' ) {
		return (
			<>
				<MediaControl
					label={ isMobile ? __( 'Mobile video', 'build-n-bloom-blocks' ) : __( 'Video', 'build-n-bloom-blocks' ) }
					allowedTypes={ [ 'video' ] }
					mediaId={ get( 'videoId' ) }
					mediaUrl={ get( 'videoUrl' ) }
					onSelect={ ( video ) => set( { videoId: video.id, videoUrl: video.url } ) }
					onRemove={ () => set( { videoId: 0, videoUrl: '' } ) } />
				<MediaControl
					label={ isMobile ? __( 'Mobile fallback image (optional)', 'build-n-bloom-blocks' ) : __( 'Fallback image (optional)', 'build-n-bloom-blocks' ) }
					mediaId={ get( 'posterId' ) }
					mediaUrl={ get( 'posterUrl' ) }
					onSelect={ ( image ) => set( { posterId: image.id, posterUrl: image.url } ) }
					onRemove={ () => set( { posterId: 0, posterUrl: '' } ) } />
			</>
		);
	}

	return (
		<>
			<MediaControl
				label={ isMobile ? __( 'Mobile image', 'build-n-bloom-blocks' ) : __( 'Image', 'build-n-bloom-blocks' ) }
				mediaId={ get( 'imageId' ) }
				mediaUrl={ get( 'imageUrl' ) }
				onSelect={ ( image ) => set( { imageId: image.id, imageUrl: image.url, imageAlt: image.alt || '' } ) }
				onRemove={ () => set( { imageId: 0, imageUrl: '', imageAlt: '', focalPoint: { x: 0.5, y: 0.5 } } ) } />
			{ get( 'imageUrl' ) &&
				<>
					<FocalPointPicker
						label={ __( 'Focal point', 'build-n-bloom-blocks' ) }
						url={ get( 'imageUrl' ) }
						value={ get( 'focalPoint' ) }
						onChange={ ( focalPoint ) => set( { focalPoint } ) } />
					<TextareaControl
						label={ __( 'Alt text', 'build-n-bloom-blocks' ) }
						help={ __( 'Describe the image for people who can\'t see it. Leave empty if it is only decoration.', 'build-n-bloom-blocks' ) }
						value={ get( 'imageAlt' ) }
						onChange={ ( imageAlt ) => set( { imageAlt } ) } />
				</>
			}
		</>
	);
}

// Sidebar controls for the size (desktop and mobile) and font of the heading (part "heading") or text (part "text")
function TypographySettings( { attributes, setAttributes, part, label } ) {
	const [ fontSizeSetting, fontFamilySetting ] = useSettings( 'typography.fontSizes', 'typography.fontFamilies' );
	const fontSizes = presetList( fontSizeSetting );
	const fontOptions = [
		{ label: __( 'Theme default', 'build-n-bloom-blocks' ), value: '' },
		...presetList( fontFamilySetting ).map( ( font ) => ( { label: font.name, value: 'var(--wp--preset--font-family--' + font.slug + ')' } ) ),
		...STANDARD_FONTS,
	];

	// Theme sizes are saved as their CSS variable, so they keep any fluid sizing and follow theme changes
	function pickerValue( savedSize ) {
		const presetMatch = savedSize.match( /^var\(--wp--preset--font-size--(.+)\)$/ );
		const preset = presetMatch && fontSizes.find( ( size ) => size.slug === presetMatch[ 1 ] );
		return preset ? preset.size : ( savedSize || undefined );
	}
	function savedValue( size ) {
		const preset = fontSizes.find( ( item ) => item.size === size );
		return preset ? 'var(--wp--preset--font-size--' + preset.slug + ')' : ( size || '' );
	}

	const sizeName = part + 'FontSize';
	const mobileSizeName = part + 'MobileFontSize';
	const fontName = part + 'FontFamily';

	// Like core typography panels: size is shown, mobile size and font are added from the panel's menu
	return (
		<ToolsPanel
			label={ label }
			resetAll={ () => setAttributes( { [ sizeName ]: '', [ mobileSizeName ]: '', [ fontName ]: '' } ) }>
			<ToolsPanelItem
				label={ __( 'Size', 'build-n-bloom-blocks' ) }
				hasValue={ () => !! attributes[ sizeName ] }
				onDeselect={ () => setAttributes( { [ sizeName ]: '' } ) }
				isShownByDefault>
				<FontSizePicker
					__nextHasNoMarginBottom
					fontSizes={ fontSizes }
					value={ pickerValue( attributes[ sizeName ] ) }
					onChange={ ( size ) => setAttributes( { [ sizeName ]: savedValue( size ) } ) }
					withReset={ false } />
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Mobile size', 'build-n-bloom-blocks' ) }
				hasValue={ () => !! attributes[ mobileSizeName ] }
				onDeselect={ () => setAttributes( { [ mobileSizeName ]: '' } ) }>
				<div className="custom-label">{ __( 'Mobile (767px and under)', 'build-n-bloom-blocks' ) }</div>
				<FontSizePicker
					__nextHasNoMarginBottom
					fontSizes={ fontSizes }
					value={ pickerValue( attributes[ mobileSizeName ] ) }
					onChange={ ( size ) => setAttributes( { [ mobileSizeName ]: savedValue( size ) } ) }
					withReset={ false } />
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Font', 'build-n-bloom-blocks' ) }
				hasValue={ () => !! attributes[ fontName ] }
				onDeselect={ () => setAttributes( { [ fontName ]: '' } ) }>
				<SelectControl
					__nextHasNoMarginBottom
					label={ __( 'Font', 'build-n-bloom-blocks' ) }
					value={ attributes[ fontName ] }
					options={ fontOptions }
					onChange={ ( fontFamily ) => setAttributes( { [ fontName ]: fontFamily } ) } />
			</ToolsPanelItem>
		</ToolsPanel>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const isVideo = attributes.mediaType === 'video';
	const hasMedia = isVideo ? attributes.videoUrl : attributes.imageUrl;
	const separateMobile = hasMobileMedia( attributes );
	const isPopup = attributes.buttonAction === 'video';
	const blockProps = useBlockProps( { className: heroClassName( attributes ), style: heroStyle( attributes ) } );

	function onSelectPlaceholder( media ) {
		setAttributes( isVideo
			? { videoId: media.id, videoUrl: media.url }
			: { imageId: media.id, imageUrl: media.url, imageAlt: media.alt || '' } );
	}

	return (
		<>
			{ /* Settings tab of the block sidebar */ }
			<InspectorControls>
				<PanelBody title={ __( 'Background', 'build-n-bloom-blocks' ) }>
					<RadioControl
						label={ __( 'Background type', 'build-n-bloom-blocks' ) }
						selected={ attributes.mediaType }
						options={ [
							{ label: __( 'Image', 'build-n-bloom-blocks' ), value: 'image' },
							{ label: __( 'Video', 'build-n-bloom-blocks' ), value: 'video' },
						] }
						onChange={ ( mediaType ) => setAttributes( { mediaType } ) } />
					<MediaSettings attributes={ attributes } setAttributes={ setAttributes } type={ attributes.mediaType } />

					<ToggleControl
						label={ __( 'Different background on mobile', 'build-n-bloom-blocks' ) }
						help={ __( 'Screens 767px wide and under. Preview it with the editor\'s mobile view.', 'build-n-bloom-blocks' ) }
						checked={ attributes.mobileMediaType !== 'same' }
						onChange={ ( different ) => setAttributes( { mobileMediaType: different ? attributes.mediaType : 'same' } ) } />
					{ attributes.mobileMediaType !== 'same' &&
						<>
							<RadioControl
								label={ __( 'Mobile background type', 'build-n-bloom-blocks' ) }
								selected={ attributes.mobileMediaType }
								options={ [
									{ label: __( 'Image', 'build-n-bloom-blocks' ), value: 'image' },
									{ label: __( 'Video', 'build-n-bloom-blocks' ), value: 'video' },
								] }
								onChange={ ( mobileMediaType ) => setAttributes( { mobileMediaType } ) } />
							<MediaSettings attributes={ attributes } setAttributes={ setAttributes } prefix="mobile" type={ attributes.mobileMediaType } />
						</>
					}
				</PanelBody>

				<PanelBody title={ __( 'Content', 'build-n-bloom-blocks' ) }>
					<SelectControl
						label={ __( 'Height', 'build-n-bloom-blocks' ) }
						help={ __( 'The hero grows taller if its content needs more room.', 'build-n-bloom-blocks' ) }
						value={ String( attributes.height ) }
						options={ HEIGHTS }
						onChange={ ( height ) => setAttributes( { height: Number( height ) } ) } />
					<SelectControl
						label={ __( 'Mobile height', 'build-n-bloom-blocks' ) }
						help={ __( 'Screens 767px wide and under.', 'build-n-bloom-blocks' ) }
						value={ String( attributes.mobileHeight ) }
						options={ [ { label: __( 'Same as desktop', 'build-n-bloom-blocks' ), value: '0' }, ...HEIGHTS ] }
						onChange={ ( mobileHeight ) => setAttributes( { mobileHeight: Number( mobileHeight ) } ) } />
					<SelectControl
						label={ __( 'Content position', 'build-n-bloom-blocks' ) }
						value={ attributes.contentPosition }
						options={ [
							{ label: __( 'Top', 'build-n-bloom-blocks' ), value: 'top' },
							{ label: __( 'Middle', 'build-n-bloom-blocks' ), value: 'middle' },
							{ label: __( 'Bottom', 'build-n-bloom-blocks' ), value: 'bottom' },
						] }
						onChange={ ( contentPosition ) => setAttributes( { contentPosition } ) } />
					<SelectControl
						label={ __( 'Content alignment', 'build-n-bloom-blocks' ) }
						value={ attributes.contentAlign }
						options={ [
							{ label: __( 'Left', 'build-n-bloom-blocks' ), value: 'left' },
							{ label: __( 'Centre', 'build-n-bloom-blocks' ), value: 'center' },
							{ label: __( 'Right', 'build-n-bloom-blocks' ), value: 'right' },
						] }
						onChange={ ( contentAlign ) => setAttributes( { contentAlign } ) } />
					<ToggleControl
						label={ __( 'Show button', 'build-n-bloom-blocks' ) }
						checked={ attributes.showButton }
						onChange={ ( showButton ) => setAttributes( { showButton } ) } />
					{ attributes.showButton &&
						<>
							<RadioControl
								label={ __( 'Button action', 'build-n-bloom-blocks' ) }
								selected={ attributes.buttonAction }
								options={ [
									{ label: __( 'Link to a page', 'build-n-bloom-blocks' ), value: 'link' },
									{ label: __( 'Play a video in a popup', 'build-n-bloom-blocks' ), value: 'video' },
								] }
								onChange={ ( buttonAction ) => setAttributes( { buttonAction } ) } />
							{ isPopup ? (
								<TextControl
									label={ __( 'YouTube or Vimeo link', 'build-n-bloom-blocks' ) }
									help={ attributes.popupVideoUrl && ! videoEmbedUrl( attributes.popupVideoUrl )
										? __( 'This isn\'t a YouTube or Vimeo link. Copy the address of the video\'s page, e.g. https://www.youtube.com/watch?v=…', 'build-n-bloom-blocks' )
										: __( 'The link to the video\'s page, or its share link.', 'build-n-bloom-blocks' ) }
									value={ attributes.popupVideoUrl }
									onChange={ ( popupVideoUrl ) => setAttributes( { popupVideoUrl: popupVideoUrl.trim() } ) } />
							) : (
								<LinkControl
									label={ __( 'Button link', 'build-n-bloom-blocks' ) }
									attributes={ attributes }
									setAttributes={ setAttributes } />
							) }
							{ ( isVideo || isPopup ) &&
								<RadioControl
									label={ __( 'Button style', 'build-n-bloom-blocks' ) }
									help={ attributes.buttonStyle === 'play' ? __( 'The button text is shown under the icon. Leave it empty for just the icon.', 'build-n-bloom-blocks' ) : undefined }
									selected={ attributes.buttonStyle }
									options={ [
										{ label: __( 'Text button', 'build-n-bloom-blocks' ), value: 'text' },
										{ label: __( 'Play icon', 'build-n-bloom-blocks' ), value: 'play' },
									] }
									onChange={ ( buttonStyle ) => setAttributes( { buttonStyle } ) } />
							}
						</>
					}
				</PanelBody>
			</InspectorControls>

			{ /* Styles tab of the block sidebar */ }
			<InspectorControls group="styles">
				<TypographySettings attributes={ attributes } setAttributes={ setAttributes } part="heading" label={ __( 'Heading', 'build-n-bloom-blocks' ) } />
				<TypographySettings attributes={ attributes } setAttributes={ setAttributes } part="text" label={ __( 'Text', 'build-n-bloom-blocks' ) } />
				<PanelBody title={ __( 'Overlay', 'build-n-bloom-blocks' ) }>
					<div className="custom-label">{ __( 'Overlay colour', 'build-n-bloom-blocks' ) }</div>
					<ColorPalette
						colors={ OVERLAY_COLOURS }
						value={ attributes.overlayColor }
						onChange={ ( overlayColor ) => setAttributes( { overlayColor: overlayColor || '#000000' } ) }
						clearable={ false } />
					<RangeControl
						label={ __( 'Overlay opacity (%)', 'build-n-bloom-blocks' ) }
						value={ attributes.overlayOpacity }
						onChange={ ( overlayOpacity ) => setAttributes( { overlayOpacity } ) }
						min={ 0 }
						max={ 100 }
						step={ 5 } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ hasMedia ? (
					<>
						<MediaLayer attributes={ attributes } type={ attributes.mediaType } layer={ separateMobile ? 'desktop' : undefined } autoplay />
						{ separateMobile &&
							<MediaLayer attributes={ attributes } prefix="mobile" type={ attributes.mobileMediaType } layer="mobile" autoplay />
						}
						<div className="bnb-hero__overlay"></div>
					</>
				) : (
					<MediaPlaceholder
						className="bnb-hero__placeholder"
						icon={ isVideo ? 'format-video' : 'format-image' }
						labels={ {
							title: isVideo ? __( 'Hero video', 'build-n-bloom-blocks' ) : __( 'Hero image', 'build-n-bloom-blocks' ),
							instructions: __( 'Choose the background. Switch between image and video in the block settings.', 'build-n-bloom-blocks' ),
						} }
						accept={ isVideo ? 'video/*' : 'image/*' }
						allowedTypes={ [ attributes.mediaType ] }
						onSelect={ onSelectPlaceholder } />
				) }

				<div className="bnb-hero__content">
					<RichText
						tagName="h1"
						className={ typographyClassName( attributes, 'heading' ) }
						style={ typographyStyle( attributes, 'heading' ) }
						placeholder={ __( 'Main heading…', 'build-n-bloom-blocks' ) }
						value={ attributes.heading }
						onChange={ ( heading ) => setAttributes( { heading } ) } />
					<RichText
						tagName="p"
						className={ typographyClassName( attributes, 'text' ) }
						style={ typographyStyle( attributes, 'text' ) }
						placeholder={ __( 'Optional text…', 'build-n-bloom-blocks' ) }
						value={ attributes.text }
						onChange={ ( text ) => setAttributes( { text } ) } />
					{ attributes.showButton &&
						<div className="wp-block-buttons bnb-hero__buttons">
							{ showsPlayIcon( attributes ) ? (
								<span className="bnb-hero__play">
									<PlayIcon />
									<RichText
										tagName="span"
										className="bnb-hero__play-label"
										placeholder={ __( 'Optional label…', 'build-n-bloom-blocks' ) }
										value={ attributes.buttonText }
										onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
										allowedFormats={ [] }
										withoutInteractiveFormatting />
								</span>
							) : (
								<div className="wp-block-button">
									<RichText
										tagName="span"
										className="wp-block-button__link wp-element-button"
										placeholder={ __( 'Button text…', 'build-n-bloom-blocks' ) }
										value={ attributes.buttonText }
										onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
										allowedFormats={ [] }
										withoutInteractiveFormatting />
								</div>
							) }
						</div>
					}
				</div>
			</div>
		</>
	);
}
