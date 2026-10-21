// FRONT-END: open the YouTube popup on click, pause and close it again.

function sendCommand( iframe, func ) {
	if ( iframe && iframe.contentWindow ) {
		// Requires enablejsapi=1 on the embed URL
		iframe.contentWindow.postMessage( JSON.stringify( { event: 'command', func, args: '' } ), '*' );
	}
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
			sendCommand( iframe, 'playVideo' );
		};
		const close = ( event ) => {
			event.stopPropagation();
			sendCommand( iframe, 'pauseVideo' );
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
