import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: 'luffman-finder__process',
		'data-materials': JSON.stringify( attributes.materials ),
		'data-min': String( attributes.minThickness ),
		'data-max': String( attributes.maxThickness ),
		'data-ranks': JSON.stringify( attributes.ranks ),
	} );

	return (
		<li { ...blockProps }>
			<RichText.Content tagName="h3" className="luffman-finder__name" value={ attributes.name } />
			<RichText.Content tagName="p" className="luffman-finder__why" value={ attributes.why } />
			<dl className="luffman-finder__facts">
				<div><dt>{ __( 'Tolerance', 'luffman-blocks' ) }</dt><RichText.Content tagName="dd" value={ attributes.tolerance } /></div>
				<div><dt>{ __( 'Thickness', 'luffman-blocks' ) }</dt><RichText.Content tagName="dd" value={ attributes.thickness } /></div>
				<div><dt>{ __( 'Bed size', 'luffman-blocks' ) }</dt><RichText.Content tagName="dd" value={ attributes.bedSize } /></div>
			</dl>
		</li>
	);
}
