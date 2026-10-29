<?php
/**
 * Build'n'Bloom Base: parent block theme shared by client sites.
 *
 * Templates, layout and design settings live here. Each client has a child theme whose theme.json
 * sets their colours, fonts and button styles, and which can override any template or part.
 *
 * @package bnb-base
 */

// The parent's stylesheet, then the child theme's, so brand CSS can override the parent
function bnb_base_enqueue_styles() {
	wp_enqueue_style( 'bnb-base', get_template_directory_uri() . '/style.css', array(), wp_get_theme( get_template() )->get( 'Version' ) );

	if ( is_child_theme() ) {
		wp_enqueue_style( 'bnb-child', get_stylesheet_uri(), array( 'bnb-base' ), wp_get_theme()->get( 'Version' ) );
	}
}
add_action( 'wp_enqueue_scripts', 'bnb_base_enqueue_styles' );

// The same stylesheets in the editor, so it matches the front end.
// For a relative path, WordPress loads the file from both the child and the parent theme.
function bnb_base_setup() {
	add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'bnb_base_setup' );

// Pattern category for the theme's own patterns (patterns/*.php)
function bnb_base_register_pattern_category() {
	register_block_pattern_category( 'bnb-base', array( 'label' => __( "Build'n'Bloom", 'bnb-base' ) ) );
}
add_action( 'init', 'bnb_base_register_pattern_category' );
