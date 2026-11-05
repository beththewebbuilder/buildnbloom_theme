import { useBlockProps, RichText } from '@wordpress/block-editor';
import { cssVariables, focalPointValue, linkWrapper } from '../../utils';

// Focal point of the image as a CSS custom property. Only saved when one is set, so reviews saved before it was added still validate.
export function reviewStyle( attributes ) {
	return attributes.focalPoint ? cssVariables( { '--bnb-review-focal-point': focalPointValue( attributes.focalPoint ) } ) : undefined;
}

// Same layout as the Apex Media "Review Item": round image, company, review, then the author.
// Inside a carousel, view.js labels it as a slide.
export default function save( { attributes } ) {
	return (
		<div { ...useBlockProps.save( { style: reviewStyle( attributes ) } ) }>
			{ attributes.imageUrl &&
				<div className="bnb-review__image">
					<img
						className={ attributes.imageId ? 'wp-image-' + attributes.imageId : undefined }
						src={ attributes.imageUrl }
						alt={ attributes.imageAlt } />
				</div>
			}
			{ ! RichText.isEmpty( attributes.company ) &&
				<RichText.Content tagName="h3" className="bnb-review__company" value={ attributes.company } />
			}
			{ ! RichText.isEmpty( attributes.review ) &&
				<RichText.Content tagName="p" className="bnb-review__text" value={ attributes.review } />
			}
			{ ! RichText.isEmpty( attributes.author ) &&
				<RichText.Content tagName="p" className="bnb-review__author" value={ attributes.author } />
			}
			{ /* Only saved when both are set, so reviews saved before the link was added still validate */ }
			{ attributes.linkUrl && ! RichText.isEmpty( attributes.linkText ) &&
				<RichText.Content tagName="a" className="bnb-review__link" value={ attributes.linkText } { ...linkWrapper( attributes ).linkProps } />
			}
		</div>
	);
}
