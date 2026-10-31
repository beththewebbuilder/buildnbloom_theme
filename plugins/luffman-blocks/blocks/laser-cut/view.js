// FRONT-END: the laser follows the drawing, cutting the inside features first and then the outline,
// as on a real nest. It only runs while on screen, and not for visitors who prefer reduced motion.

const CUT_TIME = 9000;
const HOLD_TIME = 2600;
const SPARK_COUNT = 26;
const SVG_NS = 'http://www.w3.org/2000/svg';

function createSparks( container ) {
	const sparks = [];
	for ( let i = 0; i < SPARK_COUNT; i++ ) {
		const element = document.createElementNS( SVG_NS, 'circle' );
		element.setAttribute( 'r', 1.6 );
		element.setAttribute( 'fill', '#ffc27a' );
		element.setAttribute( 'opacity', 0 );
		container.appendChild( element );
		sparks.push( { element, x: 0, y: 0, vx: 0, vy: 0, life: 0 } );
	}
	return sparks;
}

function initCut( block ) {
	const paths = Array.from( block.querySelectorAll( '.luffman-cut__kerf path' ) );
	const head = block.querySelector( '.luffman-cut__head' );
	const part = block.querySelector( '.luffman-cut__part' );
	const percent = block.querySelector( '.luffman-cut__percent' );
	const sparks = createSparks( block.querySelector( '.luffman-cut__sparks' ) );

	const lengths = paths.map( ( path ) => path.getTotalLength() );
	const totalLength = lengths.reduce( ( sum, length ) => sum + length, 0 );
	paths.forEach( ( path, index ) => {
		path.style.strokeDasharray = lengths[ index ];
	} );

	let elapsed = 0;
	let lastTime = null;
	let frameId = null;
	let nextSpark = 0;

	// Draws the cut so far and returns the point the laser has reached
	function drawCut( distance ) {
		let remaining = distance;
		let point = paths[ 0 ].getPointAtLength( 0 );
		paths.forEach( ( path, index ) => {
			const cut = Math.max( 0, Math.min( lengths[ index ], remaining ) );
			path.style.strokeDashoffset = lengths[ index ] - cut;
			if ( remaining > 0 ) {
				point = path.getPointAtLength( cut );
			}
			remaining -= lengths[ index ];
		} );
		return point;
	}

	function emitSpark( point ) {
		const spark = sparks[ nextSpark ];
		if ( spark.life <= 0 ) {
			spark.x = point.x;
			spark.y = point.y;
			spark.vx = ( Math.random() - 0.5 ) * 3.2;
			spark.vy = -Math.random() * 2.6;
			spark.life = 1;
			nextSpark = ( nextSpark + 1 ) % sparks.length;
		}
	}

	function moveSparks() {
		sparks.forEach( ( spark ) => {
			if ( spark.life > 0 ) {
				spark.x += spark.vx;
				spark.y += spark.vy;
				spark.vy += 0.14;
				spark.life -= 0.03;
				spark.element.setAttribute( 'cx', spark.x );
				spark.element.setAttribute( 'cy', spark.y );
				spark.element.setAttribute( 'opacity', Math.max( 0, spark.life ) );
			}
		} );
	}

	function frame( time ) {
		if ( lastTime !== null ) {
			elapsed += time - lastTime;
		}
		lastTime = time;

		const position = elapsed % ( CUT_TIME + HOLD_TIME );
		const progress = Math.min( 1, position / CUT_TIME );
		const point = drawCut( progress * totalLength );
		percent.textContent = Math.round( progress * 100 ) + '%';

		if ( progress < 1 ) {
			head.style.display = '';
			part.setAttribute( 'opacity', 0 );
			head.setAttribute( 'transform', 'translate(' + point.x + ' ' + point.y + ')' );
			emitSpark( point );
		} else {
			head.style.display = 'none';
			part.setAttribute( 'opacity', Math.min( 1, ( position - CUT_TIME ) / 500 ) );
		}

		moveSparks();
		frameId = window.requestAnimationFrame( frame );
	}

	new window.IntersectionObserver( ( [ entry ] ) => {
		if ( entry.isIntersecting && frameId === null ) {
			lastTime = null;
			frameId = window.requestAnimationFrame( frame );
		} else if ( ! entry.isIntersecting && frameId !== null ) {
			window.cancelAnimationFrame( frameId );
			frameId = null;
		}
	} ).observe( block );
}

document.addEventListener( 'DOMContentLoaded', () => {
	if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
		return;
	}
	document.querySelectorAll( '.wp-block-luffman-blocks-laser-cut' ).forEach( initCut );
} );
