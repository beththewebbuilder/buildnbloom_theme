<?php
/**
 * Luffman Engineering functions.
 *
 * @package luffman-engineering
 */

/**
 * Uses the logo as the site icon until one is chosen in the Site Editor.
 *
 * @param string $url The site icon URL, empty when none is set.
 * @return string
 */
function luffman_site_icon_url( $url ) {
	return $url ? $url : get_theme_file_uri( 'assets/images/site-icon.png' );
}
add_filter( 'get_site_icon_url', 'luffman_site_icon_url' );
