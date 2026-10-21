import { useBlockProps, RichText } from '@wordpress/block-editor';
import { linkWrapper } from '../../utils';

export default function save( { attributes } ) {
	const { Tag, linkProps } = linkWrapper( attributes );

	return (
		<div { ...useBlockProps.save() }>
			<Tag className="bnb-card__inner" { ...linkProps }>
				{ attributes.imageUrl &&
					<div className="bnb-card__media">
						<img
							src={ attributes.imageUrl }
							alt={ attributes.imageAlt }
							className={ attributes.imageId ? 'wp-image-' + attributes.imageId : undefined } />
					</div>
				}
				{ ( ! RichText.isEmpty( attributes.title ) || ! RichText.isEmpty( attributes.text ) ) &&
					<div className="bnb-card__body">
						{ ! RichText.isEmpty( attributes.title ) &&
							<RichText.Content tagName="h3" className="bnb-card__title" value={ attributes.title } />
						}
						{ ! RichText.isEmpty( attributes.text ) &&
							<RichText.Content tagName="p" className="bnb-card__text" value={ attributes.text } />
						}
					</div>
				}
			</Tag>
		</div>
	);
}
