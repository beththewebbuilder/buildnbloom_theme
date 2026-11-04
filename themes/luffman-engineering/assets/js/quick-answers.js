/**
 * Quick answers: on phones each card folds down to its title, so visitors can open just the answer they need.
 * Larger screens show every card open, as before. Works on the cards already on the page, so nothing needs re-editing.
 */
( function () {
	const section = document.getElementById( 'answers' );
	if ( ! section ) {
		return;
	}

	const phone = window.matchMedia( '(max-width: 600px)' );

	// The title stays a heading, with a button inside it, and everything after it goes in a panel that opens and closes
	const cards = Array.from( section.querySelectorAll( '.is-style-spec-card' ) ).map( ( card, index ) => {
		const heading = card.querySelector( ':scope > h3' );
		if ( ! heading || ! heading.nextElementSibling ) {
			return null;
		}

		// is-layout-flow keeps the block gap between the intro, table and note the same as before
		const panel = document.createElement( 'div' );
		panel.className = 'luffman-answer__panel is-layout-flow';
		panel.id = 'answer-panel-' + ( index + 1 );
		while ( heading.nextSibling ) {
			panel.append( heading.nextSibling );
		}
		card.append( panel );

		const button = document.createElement( 'button' );
		button.type = 'button';
		button.className = 'luffman-answer__toggle';
		button.setAttribute( 'aria-controls', panel.id );
		button.addEventListener( 'click', () => setOpen( item, button.getAttribute( 'aria-expanded' ) !== 'true' ) );

		// Find in page can still reach a closed answer, and opens it
		panel.addEventListener( 'beforematch', () => setOpen( item, true ) );

		const item = { heading, panel, button };
		return item;
	} ).filter( Boolean );

	function setOpen( item, open ) {
		item.button.setAttribute( 'aria-expanded', String( open ) );
		if ( open ) {
			item.panel.removeAttribute( 'hidden' );
		} else {
			item.panel.setAttribute( 'hidden', 'until-found' );
		}
	}

	function fit() {
		cards.forEach( ( item ) => {
			if ( phone.matches && ! item.button.isConnected ) {
				item.button.append( ...item.heading.childNodes );
				item.heading.append( item.button );
				setOpen( item, false );
			} else if ( ! phone.matches && item.button.isConnected ) {
				item.heading.append( ...item.button.childNodes );
				item.button.remove();
				item.panel.removeAttribute( 'hidden' );
			}
		} );
	}

	fit();
	phone.addEventListener( 'change', fit );
}() );
