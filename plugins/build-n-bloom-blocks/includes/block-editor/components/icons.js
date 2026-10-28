// Font Awesome Free 6.5.1 icons (solid), inlined as SVG so no icon font or stylesheet has to load.
// Font Awesome Free by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free (Icons: CC BY 4.0) Copyright 2023 Fonticons, Inc.
//
// To add an icon, copy the viewBox and path from its SVG, e.g.
// https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/svgs/solid/<name>.svg
const ICONS = {
	play: {
		viewBox: '0 0 384 512',
		path: 'M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z',
	},
	xmark: {
		viewBox: '0 0 384 512',
		path: 'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z',
	},
};

// Decorative icon, sized to the surrounding text (1em) unless the block's CSS sizes it.
// Give the button or link around it an accessible name.
export default function Icon( { name } ) {
	const icon = ICONS[ name ];
	return (
		<svg className={ 'bnb-icon bnb-icon--' + name } viewBox={ icon.viewBox } width="1em" height="1em" aria-hidden="true" focusable="false">
			<path fill="currentColor" d={ icon.path } />
		</svg>
	);
}
