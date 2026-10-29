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

// FocalPointPicker value ({ x: 0.5, y: 0.2 }) -> CSS object-position ("50% 20%"), or '' if not set
export function focalPointValue( focalPoint ) {
	return focalPoint ? Math.round( focalPoint.x * 100 ) + '% ' + Math.round( focalPoint.y * 100 ) + '%' : '';
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

// YouTube or Vimeo page/share/embed link -> URL to embed in an iframe, or '' if it isn't recognised
export function videoEmbedUrl( url ) {
	const youTube = ( url || '' ).match( /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/ );
	if ( youTube ) {
		return 'https://www.youtube.com/embed/' + youTube[ 1 ];
	}
	// Unlisted Vimeo videos have a privacy hash after the ID: vimeo.com/123/abc or ?h=abc
	const vimeo = ( url || '' ).match( /vimeo\.com\/(?:video\/)?(\d+)(?:\/([\da-f]+)|.*[?&]h=([\da-f]+))?/ );
	if ( vimeo ) {
		const hash = vimeo[ 2 ] || vimeo[ 3 ];
		return 'https://player.vimeo.com/video/' + vimeo[ 1 ] + ( hash ? '?h=' + hash : '' );
	}
	return '';
}

// Media library selection -> the attributes the blocks store for it
export function mediaAttributes( media, prefix ) {
	return {
		[ prefix + 'Id' ]: media.id,
		[ prefix + 'Url' ]: media.url,
	};
}
