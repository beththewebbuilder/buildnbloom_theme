import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';
import { cssVariables } from '../../utils';

export const CARD_HEIGHTS = { small: '15rem', medium: '30rem', large: '50rem' };
export const GAP_SCALE = [ '0rem', '0.25rem', '0.5rem', '1rem', '1.5rem', '2rem' ];

// Settings are passed to the stylesheet as CSS custom properties.
// A fixed height replaces the image shape, so the shape is ignored while one is set.
export function gridStyle( attributes ) {
	return cssVariables( {
		'--bnb-grid-columns': attributes.columns,
		'--bnb-grid-columns-tablet': attributes.tabletColumns,
		'--bnb-grid-columns-mobile': attributes.mobileColumns,
		'--bnb-card-aspect-ratio': attributes.cardHeight ? 'auto' : attributes.aspectRatio,
		'--bnb-card-height': CARD_HEIGHTS[ attributes.cardHeight ],
		'--bnb-grid-gap': GAP_SCALE[ attributes.gap ],
	} );
}

export function gridClassName( attributes ) {
	return attributes.cardStyle === 'overlay' ? 'has-overlay-cards' : undefined;
}

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( { className: gridClassName( attributes ), style: gridStyle( attributes ) } );
	const { children, ...gridProps } = useInnerBlocksProps.save( blockProps );
	const hasHeading = ! RichText.isEmpty( attributes.heading );
	const hasIntro = ! RichText.isEmpty( attributes.intro );

	// The header sits inside the grid and spans every column
	return (
		<div { ...gridProps }>
			{ ( hasHeading || hasIntro ) &&
				<div className="bnb-grid__header">
					{ hasHeading &&
						<RichText.Content tagName="h2" className="bnb-grid__heading" value={ attributes.heading } />
					}
					{ hasIntro &&
						<RichText.Content tagName="p" className="bnb-grid__intro" value={ attributes.intro } />
					}
				</div>
			}
			{ children }
		</div>
	);
}
