import { useBlockProps, RichText } from '@wordpress/block-editor';
import { linkWrapper } from '../../utils';

// The number and arrow come from the stylesheet, so screen readers do not read them out twice
export default function save( { attributes } ) {
	const { Tag, linkProps } = linkWrapper( attributes );

	return (
		<li { ...useBlockProps.save() }>
			<Tag className="bnb-process__row" { ...linkProps }>
				<RichText.Content tagName="h3" className="bnb-process__title" value={ attributes.title } />
				{ ! RichText.isEmpty( attributes.text ) &&
					<RichText.Content tagName="p" className="bnb-process__text" value={ attributes.text } />
				}
				{ ! RichText.isEmpty( attributes.spec ) &&
					<RichText.Content tagName="p" className="bnb-process__spec" value={ attributes.spec } />
				}
			</Tag>
		</li>
	);
}
