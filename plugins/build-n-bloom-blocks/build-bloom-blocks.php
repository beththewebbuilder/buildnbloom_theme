<?php
/**
 * Plugin Name:       Build'n'Bloom Gutenberg Blocks
 * Description:       Custom designed gutenberg blocks for Build'n'Bloom clients.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            Bethany Fowler
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       build-n-bloom-blocks
 *
 * @package           buildnbloom
 */

 // Register the new group/category of gutenburg blocks,     
function custom_block_category( $categories ) {
    $custom_block = array(
        'slug'  => 'buildnbloom',
        'title' => __( 'Build N Bloom', 'build-n-bloom-blocks' ),
    );
  
    $categories_sorted = array();
    $categories_sorted[0] = $custom_block;
  
    foreach ($categories as $category) {
        $categories_sorted[] = $category;
    }
  
    return $categories_sorted;
}
add_filter( 'block_categories_all', 'custom_block_category', 10, 2);

// Keep every block in this plugin (including new ones) in the Build N Bloom category,
// whatever category its block.json says. The server-side filter covers PHP registration;
// the editor filter covers registerBlockType() in each block's index.js, which spreads block.json.
function buildnbloom_force_block_category( $metadata ) {
	if ( isset( $metadata['name'] ) && 0 === strpos( $metadata['name'], 'build-n-bloom-blocks/' ) ) {
		$metadata['category'] = 'buildnbloom';
	}
	return $metadata;
}
add_filter( 'block_type_metadata', 'buildnbloom_force_block_category' );

function buildnbloom_force_editor_block_category() {
	wp_add_inline_script( 'wp-blocks', "wp.hooks.addFilter( 'blocks.registerBlockType', 'build-n-bloom-blocks/category', function( settings, name ) {
		return 0 === name.indexOf( 'build-n-bloom-blocks/' ) ? Object.assign( {}, settings, { category: 'buildnbloom' } ) : settings;
	} );" );
}
add_action( 'enqueue_block_editor_assets', 'buildnbloom_force_editor_block_category' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function build_n_bloom_blocks_init() {

	// Icons used by the Video Popup block (play/close); referenced from its block.json
	wp_register_style( 'buildnbloom-font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css', array(), '6.5.1' );

	// Each family is a block followed by the child blocks that can only be used inside it.
	// A site can remove families it doesn't use, e.g. in its theme's functions.php:
	//   add_filter( 'build_n_bloom_blocks', function( $blocks ) { unset( $blocks['tabs'] ); return $blocks; } );
	$blocks = apply_filters( 'build_n_bloom_blocks', array(
		'hero-media'    => array( 'hero-media' ),
		'youtube-video' => array( 'youtube-video' ),
		'item-grid'     => array( 'item-grid', 'grid-card' ),
		'carousel'      => array( 'carousel', 'carousel-slide', 'review-item' ),
		'tabs'          => array( 'tabs', 'tab' ),
	) );

	foreach( $blocks as $family ) {
		foreach( $family as $block ) {
			$block_type = register_block_type( plugin_dir_path( __FILE__ ) . 'includes/block-editor/blocks/' . $block );
			if ( $block_type ) {
				buildnbloom_version_block_styles( $block_type );
			}
		}
	}
}
add_action( 'init', 'build_n_bloom_blocks_init' );

/**
 * WordPress versions block.json stylesheets with the block's "version", which doesn't change
 * on each build, so browsers kept showing old styles. Use the built file's modified time instead.
 */
function buildnbloom_version_block_styles( $block_type ) {
	$wp_styles = wp_styles();
	$handles   = array_merge( (array) $block_type->style_handles, (array) $block_type->editor_style_handles );

	foreach ( $handles as $handle ) {
		$style = isset( $wp_styles->registered[ $handle ] ) ? $wp_styles->registered[ $handle ] : null;
		if ( ! $style || ! is_string( $style->src ) ) {
			continue;
		}
		$path = str_replace( plugins_url( '/', __FILE__ ), plugin_dir_path( __FILE__ ), strtok( $style->src, '?' ) );
		if ( file_exists( $path ) ) {
			$style->ver = (string) filemtime( $path );
		}
	}
}