import { useBlockProps, RichText } from '@wordpress/block-editor';
import { linkWrapper } from '../../utils';

export default function save( { attributes } ) {
	const { Tag, linkProps } = linkWrapper( attributes );

	return (
		<div { ...useBlockProps.save( { role: 'group', 'aria-roledescription': 'slide' } ) }>
			<Tag className="bnb-carousel__slide-inner" { ...linkProps }>
				{ attributes.imageUrl &&
					<img
						className={ 'bnb-carousel__image' + ( attributes.imageId ? ' wp-image-' + attributes.imageId : '' ) }
						src={ attributes.imageUrl }
						alt={ attributes.imageAlt } />
				}
				{ ! RichText.isEmpty( attributes.caption ) &&
					<RichText.Content tagName="p" className="bnb-carousel__caption" value={ attributes.caption } />
				}
			</Tag>
		</div>
	);
}
