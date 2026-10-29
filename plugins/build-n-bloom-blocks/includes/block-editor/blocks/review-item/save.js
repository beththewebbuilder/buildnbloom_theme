import { useBlockProps, RichText } from '@wordpress/block-editor';

// Same layout as the Apex Media "Review Item": round image, company, review, then the author.
// Inside a carousel, view.js labels it as a slide.
export default function save( { attributes } ) {
	return (
		<div { ...useBlockProps.save() }>
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
		</div>
	);
}
