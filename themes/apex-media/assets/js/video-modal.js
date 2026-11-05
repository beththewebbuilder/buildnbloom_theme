/**
 * Video pop-up: a button that links to a YouTube or Vimeo video (e.g. "Watch the showreel" in the
 * Apex hero) plays it in a pop-up over the page instead of leaving the site.
 *
 * Without JavaScript, or with Ctrl/Cmd-click, the link still opens the video on YouTube or Vimeo.
 * Closes with the × button, the Escape key or a click outside the video, which also stops it.
 */
( function () {
	// YouTube or Vimeo page/share link -> URL to embed and autoplay, or '' if it isn't a video link
	function embedUrl( href ) {
		var youTube = href.match( /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/ );
		if ( youTube ) {
			return 'https://www.youtube-nocookie.com/embed/' + youTube[ 1 ] + '?autoplay=1&rel=0';
		}
		// Unlisted Vimeo videos have a privacy hash after the ID: vimeo.com/123/abc or ?h=abc
		var vimeo = href.match( /vimeo\.com\/(?:video\/)?(\d+)(?:\/([\da-f]+)|.*[?&]h=([\da-f]+))?/ );
		if ( vimeo ) {
			var hash = vimeo[ 2 ] || vimeo[ 3 ];
			return 'https://player.vimeo.com/video/' + vimeo[ 1 ] + '?autoplay=1' + ( hash ? '&h=' + hash : '' );
		}
		return '';
	}

	var dialog, frame;

	function createDialog() {
		dialog = document.createElement( 'dialog' );
		dialog.className = 'apex-video-modal';
		dialog.innerHTML =
			'<button type="button" class="apex-video-modal__close" aria-label="Close video">' +
			'<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2"/></svg>' +
			'</button>' +
			'<div class="apex-video-modal__frame"></div>';
		frame = dialog.querySelector( '.apex-video-modal__frame' );

		dialog.querySelector( '.apex-video-modal__close' ).addEventListener( 'click', function () {
			dialog.close();
		} );
		// A click on the dark area around the video (the dialog itself, not its contents)
		dialog.addEventListener( 'click', function ( event ) {
			if ( event.target === dialog ) {
				dialog.close();
			}
		} );
		// Removing the player stops the video, however the pop-up was closed
		dialog.addEventListener( 'close', function () {
			frame.innerHTML = '';
			document.documentElement.classList.remove( 'apex-video-modal-open' );
		} );
		document.body.appendChild( dialog );
	}

	function open( src, title ) {
		if ( ! dialog ) {
			createDialog();
		}
		var iframe = document.createElement( 'iframe' );
		iframe.src = src;
		iframe.title = title;
		iframe.allow = 'autoplay; fullscreen; picture-in-picture';
		iframe.allowFullscreen = true;
		frame.appendChild( iframe );
		dialog.setAttribute( 'aria-label', title );
		document.documentElement.classList.add( 'apex-video-modal-open' );
		dialog.showModal();
	}

	document.addEventListener( 'click', function ( event ) {
		var link = event.target.closest && event.target.closest( '.wp-block-button__link[href]' );
		if ( ! link || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0 || ! window.HTMLDialogElement ) {
			return;
		}
		var src = embedUrl( link.href );
		if ( src ) {
			event.preventDefault();
			open( src, link.textContent.trim() || 'Video' );
		}
	} );
}() );
