// FRONT-END: selects options, updates the preview and passes the choices to the quote form.
// Each product's options are blocks, including which options show when, and what they ask the visitor.
// Add a preview here for a product that needs its own drawing.
import { createFirepitPreview } from './firepit-preview';

const DRAWN_PREVIEWS = {
	firepit: createFirepitPreview,
};

function showStackedImages( preview, chosen ) {
	preview.replaceChildren( ...chosen.filter( ( button ) => button.dataset.image ).map( ( button ) => {
		const image = document.createElement( 'img' );
		image.src = button.dataset.image;
		image.alt = '';
		return image;
	} ) );
}

function readPhotos( button ) {
	try {
		return JSON.parse( button.dataset.photos || '[]' );
	} catch ( error ) {
		return [];
	}
}

function element( tag, className, text ) {
	const node = document.createElement( tag );
	node.className = className;
	if ( text ) {
		node.textContent = text;
	}
	return node;
}

// What an option asks the visitor once it is chosen: some text, an upload, or both
function buildPrompt( button, index, onChange, drawn ) {
	const box = element( 'div', 'luffman-config__custom' );
	box.hidden = true;
	const prompt = { box, button };

	if ( button.dataset.textPrompt ) {
		const id = 'luffman-option-' + index;
		const label = element( 'label', 'luffman-control-label', button.dataset.textPrompt );
		label.htmlFor = id;
		const isLong = button.dataset.textUse === 'enquiry';
		prompt.input = document.createElement( isLong ? 'textarea' : 'input' );
		prompt.input.id = id;
		prompt.input.placeholder = button.dataset.textPlaceholder || '';
		if ( isLong ) {
			prompt.input.rows = 3;
		}
		prompt.input.addEventListener( 'input', onChange );
		box.append( label, prompt.input );
	}

	if ( button.dataset.uploadLabel ) {
		button.classList.add( 'is-own' );
		const label = element( 'label', 'luffman-config__drop' );
		const name = element( 'strong', '', button.dataset.uploadLabel );
		prompt.file = document.createElement( 'input' );
		prompt.file.type = 'file';
		prompt.file.accept = 'image/*';
		label.append( name, element( 'span', '', button.dataset.uploadHelp ), prompt.file );
		box.appendChild( label );

		prompt.file.addEventListener( 'change', () => {
			const file = prompt.file.files[ 0 ];
			if ( ! file || ! drawn ) {
				return;
			}
			const image = new window.Image();
			image.onload = () => {
				name.textContent = file.name;
				drawn.setUpload( image );
				window.URL.revokeObjectURL( image.src );
			};
			image.src = window.URL.createObjectURL( file );
		} );

		const swapLabel = element( 'label', 'luffman-config__check' );
		const swap = document.createElement( 'input' );
		swap.type = 'checkbox';
		swap.addEventListener( 'change', () => drawn && drawn.setSwap( swap.checked ) );
		swapLabel.append( swap, document.createTextNode( ' Cut out the light areas instead' ) );
		box.appendChild( swapLabel );
	}

	return prompt;
}

function initConfigurator( root ) {
	const stage = root.querySelector( '.luffman-config__stage' );
	const preview = root.querySelector( '.luffman-config__preview' );
	const summary = root.querySelector( '.luffman-config__summary' );
	const cta = root.querySelector( '.luffman-config__cta' );
	const ctaUrl = cta.getAttribute( 'href' );
	const type = root.dataset.preview;
	const drawn = DRAWN_PREVIEWS[ type ] ? DRAWN_PREVIEWS[ type ]( stage, preview ) : null;

	// Notes and photos sit under the bordered stage
	const visual = element( 'div', 'luffman-config__visual' );
	const stageNote = element( 'p', 'luffman-config__stage-note' );
	const gallery = element( 'div', 'luffman-config__gallery' );
	stage.before( visual );
	visual.append( stage, stageNote, gallery );

	let enquiry = '';
	let shownPhotos = '';
	let promptCount = 0;
	const upload = { file: null };

	function showPhotos( photos ) {
		const key = JSON.stringify( photos );
		if ( key === shownPhotos ) {
			return;
		}
		shownPhotos = key;
		gallery.replaceChildren( ...photos.map( ( photo ) => {
			const figure = element( 'figure', '' );
			const image = document.createElement( 'img' );
			image.src = photo.url;
			image.alt = photo.alt || '';
			image.loading = 'lazy';
			figure.appendChild( image );
			if ( photo.caption ) {
				figure.appendChild( element( 'figcaption', '', photo.caption ) );
			}
			return figure;
		} ) );
	}

	const groups = Array.from( root.querySelectorAll( '.luffman-config__group' ) ).map( ( fieldset ) => {
		const buttons = Array.from( fieldset.querySelectorAll( '.luffman-seg__button' ) );
		const legend = fieldset.querySelector( 'legend' );
		const chosenName = element( 'span', 'luffman-config__chosen' );
		const note = element( 'p', 'luffman-config__group-note' );
		note.setAttribute( 'aria-live', 'polite' );
		legend.after( note );
		const group = {
			fieldset,
			buttons,
			note,
			key: fieldset.dataset.key,
			isOptional: fieldset.dataset.optional === 'true',
			showWhen: ( fieldset.dataset.showWhen || '' ).split( '=' ),
			chosenName,
			prompts: [],
		};
		if ( ! group.isOptional ) {
			legend.append( ': ', chosenName );
		}
		return group;
	} );

	function update() {
		const selection = {};
		const chosen = [];
		const summaryParts = [];
		const extras = [];

		groups.forEach( ( group ) => {
			const [ conditionKey, conditionValue ] = group.showWhen;
			const isShown = ! conditionKey || ( selection[ conditionKey ] && selection[ conditionKey ].value === conditionValue );
			group.fieldset.hidden = ! isShown;
			group.prompts.forEach( ( prompt ) => {
				prompt.box.hidden = ! isShown || prompt.button.getAttribute( 'aria-pressed' ) !== 'true';
			} );
			if ( ! isShown ) {
				return;
			}

			const button = group.fieldset.querySelector( '[aria-pressed="true"]' );
			group.note.textContent = button ? button.dataset.note || '' : '';
			if ( ! button ) {
				return;
			}

			selection[ group.key ] = button.dataset;
			chosen.push( button );

			const prompt = group.prompts.find( ( item ) => item.button === button );
			const typed = prompt && prompt.input ? prompt.input.value.trim() : '';
			const useTyped = typed && button.dataset.textUse !== 'enquiry';
			const name = useTyped ? typed : button.textContent;
			group.chosenName.textContent = name;

			if ( typed && ! useTyped ) {
				extras.push( button.dataset.textPrompt + ': ' + typed );
			}
			if ( ! button.dataset.noSummary ) {
				summaryParts.push( useTyped ? typed : button.dataset.summary || button.textContent );
			}
		} );

		const text = summaryParts.join( ' · ' );
		enquiry = [ root.dataset.enquiryPrefix + text, ...extras ].join( '\n' );
		summary.textContent = text;
		stageNote.textContent = chosen.map( ( button ) => button.dataset.stageNote ).filter( Boolean ).join( ' ' );
		showPhotos( chosen.flatMap( readPhotos ) );

		const uploadPrompt = groups.flatMap( ( group ) => group.prompts ).find( ( prompt ) => prompt.file && ! prompt.box.hidden );
		upload.file = uploadPrompt ? uploadPrompt.file : null;

		if ( drawn ) {
			drawn.update( selection );
		} else if ( type === 'images' ) {
			showStackedImages( preview, chosen );
		}

		// If the form is on another page, the choices travel in the link
		const url = new URL( ctaUrl, window.location.href );
		url.searchParams.set( 'details', enquiry );
		cta.href = url.href;
	}

	groups.forEach( ( group ) => {
		if ( ! group.isOptional && group.buttons[ 0 ] ) {
			group.buttons[ 0 ].setAttribute( 'aria-pressed', 'true' );
		}

		group.buttons.forEach( ( button ) => {
			if ( button.dataset.textPrompt || button.dataset.uploadLabel ) {
				promptCount += 1;
				const prompt = buildPrompt( button, promptCount, update, drawn );
				group.prompts.push( prompt );
				group.fieldset.appendChild( prompt.box );
			}

			button.addEventListener( 'click', () => {
				const wasPressed = button.getAttribute( 'aria-pressed' ) === 'true';
				group.buttons.forEach( ( other ) => other.setAttribute( 'aria-pressed', 'false' ) );
				button.setAttribute( 'aria-pressed', String( group.isOptional ? ! wasPressed : true ) );
				update();
			} );
		} );
	} );

	// If the form is on this page, fill it in, add any artwork and scroll there without reloading
	cta.addEventListener( 'click', ( event ) => {
		const message = document.querySelector( 'textarea[name="details"]' );
		const target = new URL( ctaUrl, window.location.href );
		if ( ! message || target.pathname !== window.location.pathname ) {
			return;
		}
		event.preventDefault();
		message.value = enquiry;

		const formFile = message.closest( 'form' ).querySelector( 'input[type="file"]' );
		if ( formFile && upload.file && upload.file.files.length ) {
			const transfer = new window.DataTransfer();
			transfer.items.add( upload.file.files[ 0 ] );
			formFile.files = transfer.files;
		}

		message.closest( 'form' ).scrollIntoView();
		message.focus( { preventScroll: true } );
	} );

	root.classList.add( 'is-ready' );
	update();
}

document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.wp-block-luffman-blocks-product-configurator' ).forEach( initConfigurator );
} );
