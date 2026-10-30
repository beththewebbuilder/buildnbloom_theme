import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';

// Lists are typed one item per line in the sidebar, so blank lines are dropped here
export function cleanList( list ) {
	return ( list || [] ).map( ( item ) => item.trim() ).filter( Boolean );
}

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		'data-materials': JSON.stringify( cleanList( attributes.materials ) ),
		'data-priorities': JSON.stringify( cleanList( attributes.priorities ) ),
		'data-min': String( attributes.minThickness ),
		'data-max': String( attributes.maxThickness ),
		'data-default': String( attributes.defaultThickness ),
		'data-no-match': attributes.noMatch,
	} );

	// Without JavaScript every process is listed; view.js adds the controls and shows the best match
	return (
		<div { ...blockProps }>
			<div className="luffman-finder__intro">
				<RichText.Content tagName="p" className="luffman-eyebrow" value={ attributes.eyebrow } />
				<RichText.Content tagName="h2" className="luffman-finder__heading" value={ attributes.heading } />
				<div className="luffman-finder__controls"></div>
			</div>
			<div className="luffman-finder__panel">
				<div className="luffman-finder__result" aria-live="polite">
					<ul { ...useInnerBlocksProps.save( { className: 'luffman-finder__processes' } ) } />
					<p className="luffman-finder__also"></p>
				</div>
				{ ! RichText.isEmpty( attributes.note ) &&
					<RichText.Content tagName="p" className="luffman-finder__note" value={ attributes.note } />
				}
			</div>
		</div>
	);
}
