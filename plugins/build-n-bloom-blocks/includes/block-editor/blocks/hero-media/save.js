import { useBlockProps, RichText } from '@wordpress/block-editor';
import { cssVariables, linkWrapper, videoEmbedUrl } from '../../utils';
import Icon from '../../components/icons';
import MediaLayer, { hasMobileMedia } from './media-layer';

// Always full width, plus content position/alignment as modifier classes. Shared with edit.js
export function heroClassName( attributes ) {
	return 'alignfull bnb-hero--content-' + attributes.contentPosition + ' bnb-hero--align-' + attributes.contentAlign;
}

function focalPointValue( focalPoint ) {
	return focalPoint ? Math.round( focalPoint.x * 100 ) + '% ' + Math.round( focalPoint.y * 100 ) + '%' : '';
}

// Settings are passed to the stylesheet as CSS custom properties.
// Heights are a percentage of the screen height; full screen (desktop) and same as desktop (mobile) are the stylesheet defaults.
export function heroStyle( attributes ) {
	return cssVariables( {
		'--bnb-hero-screen-height': attributes.height !== 100 ? attributes.height : '',
		'--bnb-hero-mobile-screen-height': attributes.mobileHeight || '',
		'--bnb-hero-overlay-color': attributes.overlayColor,
		'--bnb-hero-overlay-opacity': attributes.overlayOpacity / 100,
		'--bnb-hero-focal-point': focalPointValue( attributes.focalPoint ),
		'--bnb-hero-mobile-focal-point': focalPointValue( attributes.mobileFocalPoint ),
	} );
}

// Size and font of the heading (part "heading") or text (part "text"), from e.g. headingFontSize / textFontSize.
// Set inline on the element so they win over the theme's h1/p styles.
// The mobile size is a custom property applied by style.scss on small screens.
// Undefined when nothing is set, so no empty style attribute is saved.
export function typographyStyle( attributes, part ) {
	const style = {};
	if ( attributes[ part + 'FontSize' ] ) {
		style.fontSize = attributes[ part + 'FontSize' ];
	}
	if ( attributes[ part + 'MobileFontSize' ] ) {
		style[ '--bnb-hero-' + part + '-mobile-size' ] = attributes[ part + 'MobileFontSize' ];
	}
	if ( attributes[ part + 'FontFamily' ] ) {
		style.fontFamily = attributes[ part + 'FontFamily' ];
	}
	return Object.keys( style ).length ? style : undefined;
}

export function typographyClassName( attributes, part ) {
	return 'bnb-hero__' + part + ( attributes[ part + 'MobileFontSize' ] ? ' bnb-hero__' + part + '--mobile-size' : '' );
}

// The play icon style is offered when the background is a video or the button plays one
export function showsPlayIcon( attributes ) {
	return attributes.buttonStyle === 'play' && ( attributes.mediaType === 'video' || attributes.buttonAction === 'video' );
}

export function PlayIcon() {
	return (
		<span className="bnb-hero__play-icon">
			<Icon name="play" />
		</span>
	);
}

export default function save( { attributes } ) {
	const separateMobile = hasMobileMedia( attributes );
	const hasVideo = ( attributes.mediaType === 'video' && attributes.videoUrl ) || ( separateMobile && attributes.mobileMediaType === 'video' );
	const isPopup = attributes.buttonAction === 'video';
	const embedUrl = isPopup ? videoEmbedUrl( attributes.popupVideoUrl ) : '';
	const playIcon = showsPlayIcon( attributes );
	const hasLabel = ! RichText.isEmpty( attributes.buttonText );
	const hasButton = attributes.showButton && ( isPopup ? embedUrl : attributes.linkUrl ) && ( playIcon || hasLabel );

	// A popup button is a link to the video page, so it still works without JS; view.js opens it in the popup instead
	const buttonProps = isPopup
		? { href: attributes.popupVideoUrl, 'data-bnb-hero-video': embedUrl, 'aria-haspopup': 'dialog' }
		: linkWrapper( attributes ).linkProps;

	return (
		<div { ...useBlockProps.save( { className: heroClassName( attributes ), style: heroStyle( attributes ) } ) }>
			<MediaLayer
				attributes={ attributes }
				type={ attributes.mediaType }
				layer={ separateMobile ? 'desktop' : undefined }
				autoplay={ ! separateMobile } />
			{ separateMobile &&
				<MediaLayer attributes={ attributes } prefix="mobile" type={ attributes.mobileMediaType } layer="mobile" />
			}
			<div className="bnb-hero__overlay" aria-hidden="true"></div>

			<div className="bnb-hero__content">
				{ ! RichText.isEmpty( attributes.heading ) &&
					<RichText.Content tagName="h1" className={ typographyClassName( attributes, 'heading' ) } style={ typographyStyle( attributes, 'heading' ) } value={ attributes.heading } />
				}
				{ ! RichText.isEmpty( attributes.text ) &&
					<RichText.Content tagName="p" className={ typographyClassName( attributes, 'text' ) } style={ typographyStyle( attributes, 'text' ) } value={ attributes.text } />
				}
				{ hasButton &&
					<div className="wp-block-buttons bnb-hero__buttons">
						{ playIcon ? (
							<a className="bnb-hero__play" { ...buttonProps } aria-label={ hasLabel ? undefined : 'Play video' }>
								<PlayIcon />
								{ hasLabel &&
									<RichText.Content tagName="span" className="bnb-hero__play-label" value={ attributes.buttonText } />
								}
							</a>
						) : (
							<div className="wp-block-button">
								<RichText.Content tagName="a" className="wp-block-button__link wp-element-button" value={ attributes.buttonText } { ...buttonProps } />
							</div>
						) }
					</div>
				}
			</div>

			{ /* Video popup, filled and opened by view.js */ }
			{ hasButton && isPopup &&
				<dialog className="bnb-hero__modal" aria-label="Video">
					<button type="button" className="bnb-hero__modal-close" aria-label="Close video">
						<Icon name="xmark" />
					</button>
					<div className="bnb-hero__modal-frame"></div>
				</dialog>
			}

			{ /* Shown by view.js, which also stops autoplay for visitors who prefer reduced motion */ }
			{ hasVideo &&
				<button type="button" className="bnb-hero__pause" aria-label="Pause background video" hidden></button>
			}
		</div>
	);
}
