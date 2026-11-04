import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<li { ...useBlockProps() }>
			<RichText
				tagName="span"
				className="bnb-stat__value"
				placeholder={ __( 'Figure…', 'build-n-bloom-blocks' ) }
				allowedFormats={ [] }
				value={ attributes.value }
				onChange={ ( value ) => setAttributes( { value } ) } />
			<RichText
				tagName="span"
				className="bnb-stat__label"
				placeholder={ __( 'Label…', 'build-n-bloom-blocks' ) }
				allowedFormats={ [] }
				value={ attributes.label }
				onChange={ ( label ) => setAttributes( { label } ) } />
		</li>
	);
}
