<?php
/**
 * Plugin Name:       Build'n'Bloom Gutenberg Blocks
 * Description:       Custom designed gutenberg blocks for Build'n'Bloom clients.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       multiple-blocks build-n-bloom-blocks
 *
 * @package           buildnbloom
 */

 // Register the new group/category of gutenburg blocks,     
function custom_block_category( $categories ) {
    $custom_block = array(
        'slug'  => 'buildnbloom',
        'title' => __( 'Build N Bloom', 'buildnbloom' ),
    );
  
    $categories_sorted = array();
    $categories_sorted[0] = $custom_block;
  
    foreach ($categories as $category) {
        $categories_sorted[] = $category;
    }
  
    return $categories_sorted;
}
add_filter( 'block_categories_all', 'custom_block_category', 10, 2);

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function build_n_bloom_blocks_init() {

	// Icons used by the YouTube block (play/close); referenced from its block.json
	wp_register_style( 'buildnbloom-font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css', array(), '6.5.1' );

	$blocks = array(
        'image-background/',
		'youtube-video/',
		'block-two/',
	);

	foreach( $blocks as $block ) {
		register_block_type( plugin_dir_path( __FILE__ ) . 'includes/block-editor/blocks/' . $block );
	}
}
add_action( 'init', 'build_n_bloom_blocks_init' );