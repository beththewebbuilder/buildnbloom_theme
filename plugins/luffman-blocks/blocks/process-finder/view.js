// FRONT-END: builds the choices and shows the process that best suits them.
// The rules come from each Finder Process block, so they can be changed in the editor.

function readList( value ) {
	try {
		return JSON.parse( value || '[]' );
	} catch ( error ) {
		return [];
	}
}

function choiceGroup( labelText, options, selected, onChange ) {
	const wrapper = document.createElement( 'div' );
	wrapper.setAttribute( 'role', 'group' );
	wrapper.setAttribute( 'aria-label', labelText );

	const label = document.createElement( 'span' );
	label.className = 'luffman-control-label';
	label.textContent = labelText;
	wrapper.appendChild( label );

	const row = document.createElement( 'div' );
	row.className = 'luffman-seg';
	options.forEach( ( option ) => {
		const button = document.createElement( 'button' );
		button.type = 'button';
		button.className = 'luffman-seg__button';
		button.textContent = option;
		button.setAttribute( 'aria-pressed', String( option === selected ) );
		button.addEventListener( 'click', () => {
			row.querySelectorAll( 'button' ).forEach( ( other ) => other.setAttribute( 'aria-pressed', 'false' ) );
			button.setAttribute( 'aria-pressed', 'true' );
			onChange( option );
		} );
		row.appendChild( button );
	} );
	wrapper.appendChild( row );
	return wrapper;
}

function initFinder( finder, index ) {
	const materials = readList( finder.dataset.materials );
	const priorities = readList( finder.dataset.priorities );
	const controls = finder.querySelector( '.luffman-finder__controls' );
	const also = finder.querySelector( '.luffman-finder__also' );
	const processes = Array.from( finder.querySelectorAll( '.luffman-finder__process' ) ).map( ( element ) => ( {
		element,
		name: element.querySelector( '.luffman-finder__name' ).textContent,
		materials: readList( element.dataset.materials ),
		min: Number( element.dataset.min ) || 0,
		max: Number( element.dataset.max ) || 0,
		ranks: readList( element.dataset.ranks ),
	} ) );

	const state = { material: materials[ 0 ], priority: priorities[ 0 ], thickness: Number( finder.dataset.default ) || 1 };
	const sliderId = 'luffman-thickness-' + index;

	const thickness = document.createElement( 'div' );
	const sliderLabel = document.createElement( 'label' );
	sliderLabel.className = 'luffman-control-label';
	sliderLabel.htmlFor = sliderId;
	const slider = document.createElement( 'input' );
	slider.type = 'range';
	slider.id = sliderId;
	slider.className = 'luffman-finder__slider';
	slider.min = finder.dataset.min;
	slider.max = finder.dataset.max;
	slider.value = state.thickness;
	thickness.append( sliderLabel, slider );

	function update() {
		sliderLabel.textContent = 'Thickness: ' + state.thickness + 'mm';

		const suitable = processes
			.filter( ( process ) => process.materials.includes( state.material )
				&& ( ! process.min || state.thickness >= process.min )
				&& ( ! process.max || state.thickness <= process.max )
				&& process.ranks[ state.priority ] > 0 )
			.sort( ( a, b ) => a.ranks[ state.priority ] - b.ranks[ state.priority ] );

		processes.forEach( ( process ) => process.element.classList.toggle( 'is-match', process === suitable[ 0 ] ) );

		if ( ! suitable.length ) {
			also.textContent = finder.dataset.noMatch;
		} else if ( suitable.length > 1 ) {
			also.textContent = 'Also suitable: ' + suitable.slice( 1 ).map( ( process ) => process.name ).join( ', ' );
		} else {
			also.textContent = 'This is the only process that suits this job.';
		}
	}

	slider.addEventListener( 'input', () => {
		state.thickness = Number( slider.value );
		update();
	} );

	controls.append(
		choiceGroup( 'Material', materials, state.material, ( material ) => {
			state.material = material;
			update();
		} ),
		thickness,
		choiceGroup( 'What matters most?', priorities, state.priority, ( priority ) => {
			state.priority = priority;
			update();
		} )
	);

	finder.classList.add( 'is-ready' );
	update();
}

document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.wp-block-luffman-blocks-process-finder' ).forEach( initFinder );
} );
