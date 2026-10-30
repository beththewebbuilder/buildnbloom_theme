import { useBlockProps, RichText } from '@wordpress/block-editor';
import { cssVariables, focalPointValue, linkWrapper } from '../../utils';

// Must match $sml-screen-size in variables.scss
export const MOBILE_MEDIA = '(max-width: 767px)';

export function hasMobileImage( attributes ) {
	return attributes.useMobileImage && Boolean( attributes.mobileImageUrl );
}

// Layout options as modifier classes, shared with edit.js
export function slideClassName( attributes ) {
	return [
		'bnb-slide--caption-' + attributes.captionPosition,
		attributes.hoverEffect !== 'none' ? 'bnb-slide--hover-' + attributes.hoverEffect : '',
	].filter( Boolean ).join( ' ' );
}

// Focal points and an image fit that overrides the carousel's, as CSS custom properties
export function slideStyle( attributes ) {
	return cssVariables( {
		'--bnb-slide-focal-point': focalPointValue( attributes.focalPoint ),
		'--bnb-slide-mobile-focal-point': hasMobileImage( attributes ) ? focalPointValue( attributes.mobileFocalPoint ) : '',
		'--bnb-carousel-image-fit': attributes.imageFit,
	} );
}

export default function save( { attributes } ) {
	const { Tag, linkProps } = linkWrapper( attributes );
	const hasHeading = ! RichText.isEmpty( attributes.heading );
	const hasCaption = ! RichText.isEmpty( attributes.caption );

	return (
		<div { ...useBlockProps.save( {
			className: slideClassName( attributes ),
			style: slideStyle( attributes ),
			role: 'group',
			'aria-roledescription': 'slide',
		} ) }>
			<Tag className="bnb-carousel__slide-inner" { ...linkProps }>
				{ attributes.imageUrl &&
					<picture className="bnb-carousel__media">
						{ hasMobileImage( attributes ) &&
							<source media={ MOBILE_MEDIA } srcSet={ attributes.mobileImageUrl } />
						}
						<img
							className={ 'bnb-carousel__image' + ( attributes.imageId ? ' wp-image-' + attributes.imageId : '' ) }
							src={ attributes.imageUrl }
							alt={ attributes.imageAlt } />
					</picture>
				}
				{ ( hasHeading || hasCaption ) &&
					<div className="bnb-carousel__content">
						{ hasHeading &&
							<RichText.Content tagName="h3" className="bnb-carousel__heading" value={ attributes.heading } />
						}
						{ hasCaption &&
							<RichText.Content tagName="p" className="bnb-carousel__caption" value={ attributes.caption } />
						}
					</div>
				}
			</Tag>
		</div>
	);
}
