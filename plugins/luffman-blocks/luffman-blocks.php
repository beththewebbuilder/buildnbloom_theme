<?php
/**
 * Plugin Name:       Luffman Blocks
 * Description:       Luffman Engineering's own content: the Process Finder and Product Configurator blocks, the Our work post type and the settings for the quote form.
 * Requires at least: 6.7
 * Requires PHP:      8.3
 * Version:           0.1.0
 * Author:            Bethany Fowler
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luffman-blocks
 *
 * @package luffman-blocks
 */

// Blocks. Child blocks can only be used inside their parent, and are registered from its script.
function luffman_register_blocks() {
	$blocks = array( 'process-finder', 'finder-process', 'product-configurator', 'option-group', 'product-option' );
	foreach ( $blocks as $block ) {
		register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/' . $block );
	}
}
add_action( 'init', 'luffman_register_blocks' );

// Fields shown on each job, saved as post meta and displayed with block bindings
function luffman_job_fields() {
	return array(
		'job_process'  => __( 'Process', 'luffman-blocks' ),
		'job_material' => __( 'Material', 'luffman-blocks' ),
		'job_result'   => __( 'Result', 'luffman-blocks' ),
	);
}

// One field in the editor template: a label next to a paragraph bound to the post meta
function luffman_job_field_template( $key, $label ) {
	return array(
		'core/group',
		array( 'layout' => array( 'type' => 'flex', 'flexWrap' => 'nowrap' ) ),
		array(
			array( 'core/paragraph', array( 'content' => $label, 'fontFamily' => 'mono', 'fontSize' => 'small' ) ),
			array(
				'core/paragraph',
				array(
					'placeholder' => $label,
					'metadata'    => array(
						'bindings' => array(
							'content' => array(
								'source' => 'core/post-meta',
								'args'   => array( 'key' => $key ),
							),
						),
					),
				),
			),
		),
	);
}

function luffman_register_jobs() {
	$template = array();
	foreach ( luffman_job_fields() as $key => $label ) {
		$template[] = luffman_job_field_template( $key, $label );
	}
	$template[] = array( 'core/paragraph', array( 'placeholder' => __( 'Tell the story of the job…', 'luffman-blocks' ) ) );

	register_post_type(
		'job',
		array(
			'labels'       => array(
				'name'          => __( 'Our work', 'luffman-blocks' ),
				'singular_name' => __( 'Job', 'luffman-blocks' ),
				'add_new_item'  => __( 'Add new job', 'luffman-blocks' ),
				'edit_item'     => __( 'Edit job', 'luffman-blocks' ),
				'all_items'     => __( 'All jobs', 'luffman-blocks' ),
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => 'our-work',
			'rewrite'      => array( 'slug' => 'our-work', 'with_front' => false ),
			'menu_icon'    => 'dashicons-hammer',
			'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions' ),
			'template'     => $template,
		)
	);

	register_taxonomy(
		'sector',
		'job',
		array(
			'labels'            => array(
				'name'          => __( 'Sectors', 'luffman-blocks' ),
				'singular_name' => __( 'Sector', 'luffman-blocks' ),
			),
			'hierarchical'      => true,
			'show_in_rest'      => true,
			'show_admin_column' => true,
			'rewrite'           => array( 'slug' => 'sector', 'with_front' => false ),
		)
	);

	foreach ( array_keys( luffman_job_fields() ) as $key ) {
		register_post_meta(
			'job',
			$key,
			array(
				'type'              => 'string',
				'single'            => true,
				'default'           => '',
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
}
add_action( 'init', 'luffman_register_jobs' );

// The Our work address only works once WordPress has rebuilt its permalinks
function luffman_activate() {
	luffman_register_jobs();
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'luffman_activate' );

function luffman_deactivate() {
	flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'luffman_deactivate' );

// The quote form's layout is set in its own markup, so stop Contact Form 7 adding <p> and <br> tags
add_filter( 'wpcf7_autop_or_not', '__return_false' );

// Contact Form 7 adds "_.txt" to file types it doesn't know, which would rename customers' drawings
function luffman_drawing_file_types( $safelist ) {
	return array_merge( $safelist, array( 'dxf', 'dwg', 'step', 'stp', 'zip' ) );
}
add_filter( 'wpcf7_file_extension_safelist', 'luffman_drawing_file_types' );

// Drawings can be confidential, so delete the temporary copy as soon as the submission has finished.
// Contact Form 7 makes uploads read-only, which stops its own clean-up deleting them on Windows.
// Only touches its temporary folder.
function luffman_delete_uploaded_drawings() {
	$submission = WPCF7_Submission::get_instance();
	if ( ! $submission ) {
		return;
	}

	$tmp_dir = trailingslashit( wp_normalize_path( wpcf7_upload_tmp_dir() ) );

	foreach ( (array) $submission->uploaded_files() as $paths ) {
		foreach ( (array) $paths as $path ) {
			if ( is_file( $path ) && str_starts_with( wp_normalize_path( $path ), $tmp_dir ) ) {
				chmod( $path, 0644 );
				unlink( $path );
				rmdir( dirname( $path ) );
			}
		}
	}
}
add_action( 'wpcf7_submit', 'luffman_delete_uploaded_drawings', 20 );
