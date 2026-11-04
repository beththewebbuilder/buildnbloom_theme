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

/**
 * Folds the Quick answers cards to their titles on phones. Only does anything on a page with the #answers section.
 */
function luffman_enqueue_scripts() {
	wp_enqueue_script(
		'luffman-quick-answers',
		get_theme_file_uri( 'assets/js/quick-answers.js' ),
		array(),
		wp_get_theme()->get( 'Version' ),
		array( 'strategy' => 'defer', 'in_footer' => true )
	);
}
add_action( 'wp_enqueue_scripts', 'luffman_enqueue_scripts' );

/**
 * Groups the Luffman patterns in their own Luffman Engineering folder in the block inserter.
 */
function luffman_register_pattern_category() {
	register_block_pattern_category( 'luffman-engineering', array( 'label' => __( 'Luffman Engineering', 'luffman-engineering' ) ) );
}
add_action( 'init', 'luffman_register_pattern_category' );
