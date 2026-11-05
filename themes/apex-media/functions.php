<?php
/**
 * Apex Media functions. Loaded as well as the parent theme's functions.php.
 *
 * @package apex-media
 */

/**
 * Groups the Apex patterns in their own Apex Media folder in the block inserter.
 */
function apex_register_pattern_category() {
	register_block_pattern_category( 'apex-media', array( 'label' => __( 'Apex Media', 'apex-media' ) ) );
}
add_action( 'init', 'apex_register_pattern_category' );

/**
 * Stops Contact Form 7 wrapping the enquiry form's fields in <p> and <br> tags, which would break
 * its two-column layout (see .apex-form in style.css).
 */
add_filter( 'wpcf7_autop_or_not', '__return_false' );

/**
 * Uses the red A as the site icon (favicon) until one is chosen in Settings → General → Site Icon.
 *
 * @param string $url The site icon URL, empty when none is set.
 * @return string
 */
function apex_site_icon_url( $url ) {
	return $url ? $url : get_theme_file_uri( 'assets/images/site-icon.png' );
}
add_filter( 'get_site_icon_url', 'apex_site_icon_url' );
