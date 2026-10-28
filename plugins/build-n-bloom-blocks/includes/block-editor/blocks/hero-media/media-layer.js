// Background media for the hero, shared by edit.js and save.js

// Matches $sml-screen-size / $tablet-up in variables.scss
const MOBILE_QUERY = '(max-width: 767px)';
const DESKTOP_QUERY = '(min-width: 768px)';

// Transparent 1px gif. A <picture> source switches to it outside the layer's screen size,
// so the image hidden at that size isn't downloaded.
const BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Attribute name for desktop (no prefix, e.g. imageUrl) or mobile media (prefix "mobile", e.g. mobileImageUrl)
export function mediaAttr( prefix, name ) {
	return prefix ? prefix + name.charAt( 0 ).toUpperCase() + name.slice( 1 ) : name;
}

// True when mobile has its own image or video chosen; otherwise mobile shows the desktop media
export function hasMobileMedia( attributes ) {
	const type = attributes.mobileMediaType;
	return type !== 'same' && !! attributes[ mediaAttr( 'mobile', type + 'Url' ) ];
}

// layer: undefined for all screen sizes, or "desktop"/"mobile" when mobile has its own media.
// Without autoplay the video waits for view.js to play it, so the hidden screen size's video isn't downloaded.
export default function MediaLayer( { attributes, prefix = '', type, layer, autoplay } ) {
	const get = ( name ) => attributes[ mediaAttr( prefix, name ) ];
	const hideQuery = layer === 'desktop' ? MOBILE_QUERY : ( layer === 'mobile' ? DESKTOP_QUERY : undefined );

	return (
		<div className={ 'bnb-hero__media' + ( layer ? ' bnb-hero__media--' + layer : '' ) }>
			{ type === 'video' && get( 'videoUrl' ) &&
				<video
					className="bnb-hero__video"
					src={ get( 'videoUrl' ) }
					poster={ get( 'posterUrl' ) || undefined }
					autoPlay={ autoplay || undefined }
					preload={ autoplay ? undefined : 'none' }
					muted
					loop
					playsInline
					aria-hidden="true" />
			}
			{ type === 'image' && get( 'imageUrl' ) &&
				<picture>
					{ hideQuery && <source media={ hideQuery } srcSet={ BLANK_IMAGE } /> }
					<img
						className={ 'bnb-hero__image' + ( get( 'imageId' ) ? ' wp-image-' + get( 'imageId' ) : '' ) }
						src={ get( 'imageUrl' ) }
						alt={ get( 'imageAlt' ) }
						fetchpriority="high" />
				</picture>
			}
		</div>
	);
}
