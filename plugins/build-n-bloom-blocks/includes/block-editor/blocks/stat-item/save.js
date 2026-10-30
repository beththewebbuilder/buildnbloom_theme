import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	return (
		<li { ...useBlockProps.save() }>
			<RichText.Content tagName="span" className="bnb-stat__value" value={ attributes.value } />
			<RichText.Content tagName="span" className="bnb-stat__label" value={ attributes.label } />
		</li>
	);
}
