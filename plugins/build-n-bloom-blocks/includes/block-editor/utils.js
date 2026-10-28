// Helpers shared by the blocks' edit and save functions

// Element and attributes to wrap linked content in: an <a> when a link is set, otherwise a <div>
export function linkWrapper( { linkUrl, opensInNewTab } ) {
	if ( ! linkUrl ) {
		return { Tag: 'div', linkProps: {} };
	}
	return {
		Tag: 'a',
		linkProps: {
			href: linkUrl,
			target: opensInNewTab ? '_blank' : undefined,
			rel: opensInNewTab ? 'noopener noreferrer' : undefined,
		},
	};
}

// Inline CSS custom properties. Values are stringified because the block serializer adds "px" to numbers.
export function cssVariables( variables ) {
	const style = {};
	Object.keys( variables ).forEach( ( name ) => {
		const value = variables[ name ];
		if ( value !== undefined && value !== null && value !== '' ) {
			style[ name ] = String( value );
		}
	} );
	return style;
}

// Media library selection -> the attributes the blocks store for it
export function mediaAttributes( media, prefix ) {
	return {
		[ prefix + 'Id' ]: media.id,
		[ prefix + 'Url' ]: media.url,
	};
}
