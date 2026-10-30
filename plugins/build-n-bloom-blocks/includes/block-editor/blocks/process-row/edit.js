import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import LinkControl from '../../components/link-control';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Row settings', 'build-n-bloom-blocks' ) }>
					<LinkControl attributes={ attributes } setAttributes={ setAttributes } />
				</PanelBody>
			</InspectorControls>

			<li { ...useBlockProps() }>
				<div className="bnb-process__row">
					<RichText
						tagName="h3"
						className="bnb-process__title"
						placeholder={ __( 'Title…', 'build-n-bloom-blocks' ) }
						allowedFormats={ [] }
						value={ attributes.title }
						onChange={ ( title ) => setAttributes( { title } ) } />
					<RichText
						tagName="p"
						className="bnb-process__text"
						placeholder={ __( 'Short description…', 'build-n-bloom-blocks' ) }
						value={ attributes.text }
						onChange={ ( text ) => setAttributes( { text } ) } />
					<RichText
						tagName="p"
						className="bnb-process__spec"
						placeholder={ __( 'Spec, e.g. sizes or tolerances…', 'build-n-bloom-blocks' ) }
						allowedFormats={ [] }
						value={ attributes.spec }
						onChange={ ( spec ) => setAttributes( { spec } ) } />
				</div>
			</li>
		</>
	);
}
