// FRONT-END: turn each tab's heading into a tab button. Without JS the tabs show as stacked headed sections.

function initTabs( tabs, tabsIndex ) {
	const list = tabs.querySelector( ':scope > .bnb-tabs__list' );
	const panels = Array.from( tabs.querySelectorAll( ':scope > .bnb-tabs__panels > .wp-block-build-n-bloom-blocks-tab' ) );
	if ( ! list || ! panels.length ) {
		return;
	}

	const buttons = panels.map( ( panel, index ) => {
		const title = panel.querySelector( ':scope > .bnb-tab__title' );
		panel.id = panel.id || `bnb-tabs-${ tabsIndex }-${ index }`;

		const button = document.createElement( 'button' );
		button.type = 'button';
		button.className = 'bnb-tabs__tab';
		button.id = `${ panel.id }-tab`;
		button.setAttribute( 'role', 'tab' );
		button.setAttribute( 'aria-controls', panel.id );
		button.textContent = title ? title.textContent : `Tab ${ index + 1 }`;
		list.appendChild( button );

		panel.setAttribute( 'role', 'tabpanel' );
		panel.setAttribute( 'aria-labelledby', button.id );
		panel.tabIndex = 0;
		return button;
	} );

	const select = ( activeIndex, moveFocus ) => {
		buttons.forEach( ( button, index ) => {
			const active = index === activeIndex;
			button.setAttribute( 'aria-selected', active ? 'true' : 'false' );
			button.tabIndex = active ? 0 : -1;
			panels[ index ].hidden = ! active;
		} );
		if ( moveFocus ) {
			buttons[ activeIndex ].focus();
		}
	};

	// Arrow keys, Home and End move between tabs
	buttons.forEach( ( button, index ) => {
		button.addEventListener( 'click', () => select( index ) );
		button.addEventListener( 'keydown', ( event ) => {
			const last = buttons.length - 1;
			const target = {
				ArrowRight: index === last ? 0 : index + 1,
				ArrowLeft: index === 0 ? last : index - 1,
				Home: 0,
				End: last,
			}[ event.key ];
			if ( target !== undefined ) {
				event.preventDefault();
				select( target, true );
			}
		} );
	} );

	tabs.classList.add( 'is-enhanced' );

	// Open the tab linked to in the URL (#anchor), otherwise the first one
	const linked = panels.findIndex( ( panel ) => '#' + panel.id === window.location.hash );
	select( Math.max( linked, 0 ) );
}

document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.wp-block-build-n-bloom-blocks-tabs' ).forEach( initTabs );
} );
