// FRONT-END: selects options, updates the preview and passes the choices to the quote form.
// Each product's options are blocks. Add a preview type here for a product that needs its own drawing.
import { renderFirepit } from './firepit-preview';

const DRAWN_PREVIEWS = {
	firepit: ( selection ) => '<svg viewBox="0 0 520 420" aria-hidden="true">' + renderFirepit( selection ) + '</svg>',
};

function showPreview( root, chosen, selection ) {
	const preview = root.querySelector( '.luffman-config__preview' );
	const type = root.dataset.preview;

	if ( DRAWN_PREVIEWS[ type ] ) {
		preview.innerHTML = DRAWN_PREVIEWS[ type ]( selection );
	} else if ( type === 'images' ) {
		preview.replaceChildren( ...chosen.filter( ( button ) => button.dataset.image ).map( ( button ) => {
			const image = document.createElement( 'img' );
			image.src = button.dataset.image;
			image.alt = '';
			return image;
		} ) );
	}
}

function initConfigurator( root ) {
	const groups = Array.from( root.querySelectorAll( '.luffman-config__group' ) );
	const summary = root.querySelector( '.luffman-config__summary' );
	const note = root.querySelector( '.luffman-config__note' );
	const cta = root.querySelector( '.luffman-config__cta' );
	const ctaUrl = cta.getAttribute( 'href' );
	let enquiry = '';

	function update() {
		const selection = {};
		const chosen = [];
		groups.forEach( ( group ) => {
			const button = group.querySelector( '[aria-pressed="true"]' );
			if ( button ) {
				selection[ group.dataset.key ] = button.dataset.value;
				chosen.push( button );
			}
		} );

		const text = chosen.map( ( button ) => button.dataset.summary || button.textContent ).join( ' · ' );
		enquiry = root.dataset.enquiryPrefix + text;
		summary.textContent = text;
		note.textContent = chosen.map( ( button ) => button.dataset.note ).filter( Boolean ).join( ' ' );
		showPreview( root, chosen, selection );

		// If the form is on another page, the choices travel in the link
		const url = new URL( ctaUrl, window.location.href );
		url.searchParams.set( 'details', enquiry );
		cta.href = url.href;
	}

	groups.forEach( ( group ) => {
		const buttons = Array.from( group.querySelectorAll( '.luffman-seg__button' ) );
		const isOptional = group.dataset.optional === 'true';

		if ( ! isOptional && buttons[ 0 ] ) {
			buttons[ 0 ].setAttribute( 'aria-pressed', 'true' );
		}

		buttons.forEach( ( button ) => {
			button.addEventListener( 'click', () => {
				const wasPressed = button.getAttribute( 'aria-pressed' ) === 'true';
				buttons.forEach( ( other ) => other.setAttribute( 'aria-pressed', 'false' ) );
				button.setAttribute( 'aria-pressed', String( isOptional ? ! wasPressed : true ) );
				update();
			} );
		} );
	} );

	// If the form is on this page, fill it in and scroll there without reloading
	cta.addEventListener( 'click', ( event ) => {
		const message = document.querySelector( 'textarea[name="details"]' );
		const target = new URL( ctaUrl, window.location.href );
		if ( message && target.pathname === window.location.pathname ) {
			event.preventDefault();
			message.value = enquiry;
			message.closest( 'form' ).scrollIntoView();
			message.focus( { preventScroll: true } );
		}
	} );

	root.classList.add( 'is-ready' );
	update();
}

document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.wp-block-luffman-blocks-product-configurator' ).forEach( initConfigurator );
} );
