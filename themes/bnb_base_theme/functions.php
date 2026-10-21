<?php

function my_deregister_scripts(){
  wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'my_deregister_scripts' );

// Add thumbnails
add_theme_support('post-thumbnails');

//WordPress Titles
add_theme_support('title-tag');

//navigation menus
register_nav_menus(array(
  'primary' => __('Primary Menu'),
  'footer' => __('Footer Menu'),
));

function styles_scripts_init() {
    //enqueue stylesheets
    wp_enqueue_style('style', get_template_directory_uri() . '/style.css');
}
add_action( 'wp_enqueue_scripts', 'styles_scripts_init' );

/**
 * Proper ob_end_flush() for all levels
 *
 * This replaces the WordPress `wp_ob_end_flush_all()` function
 * with a replacement that doesn't cause PHP notices.
 */
remove_action( 'shutdown', 'wp_ob_end_flush_all', 1 );
add_action( 'shutdown', function() {
   while ( @ob_end_flush() );
} );

 ?>
