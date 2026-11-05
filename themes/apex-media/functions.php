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
