// FRONT-END: open the video popup on click, pause and close it again.

// action is 'play' or 'pause'
function sendCommand( iframe, action ) {
	if ( ! iframe || ! iframe.contentWindow ) {
		return;
	}
	const message = iframe.src.includes( 'vimeo.com' )
		? { method: action }
		// YouTube requires enablejsapi=1 on the embed URL
		: { event: 'command', func: action + 'Video', args: '' };
	iframe.contentWindow.postMessage( JSON.stringify( message ), '*' );
}

document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.wp-block-build-n-bloom-blocks-youtube-video[data-class*="video-container-with-popup"]' ).forEach( ( block ) => {
		const popup = block.querySelector( '.video-container' );
		const iframe = popup ? popup.querySelector( 'iframe' ) : null;
		if ( ! popup ) {
			return;
		}

		const open = () => {
			popup.style.display = 'block';
			sendCommand( iframe, 'play' );
		};
		const close = ( event ) => {
			event.stopPropagation();
			sendCommand( iframe, 'pause' );
			popup.style.display = 'none';
		};

		block.querySelectorAll( ':scope > .wp-block-group, :scope > .play-icon, :scope > .click-to-play' ).forEach( ( trigger ) => {
			trigger.style.cursor = 'pointer';
			trigger.addEventListener( 'click', open );
		} );
		popup.querySelector( '.close-video' )?.addEventListener( 'click', close );
		document.addEventListener( 'keydown', ( event ) => {
			if ( event.key === 'Escape' && popup.style.display === 'block' ) {
				close( event );
			}
		} );
	} );
} );
