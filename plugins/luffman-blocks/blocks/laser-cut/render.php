<?php
/**
 * Outputs the drawing. It shows the finished part until view.js starts the animation,
 * so visitors without JavaScript, or who prefer reduced motion, see a complete image.
 *
 * @package luffman-blocks
 *
 * @var array $attributes Block attributes.
 */

$luffman_drawing = file_get_contents( __DIR__ . '/drawing.svg' );

echo '<div ' . get_block_wrapper_attributes() . '>' . strtr( // phpcs:ignore WordPress.Security.EscapeOutput
	$luffman_drawing,
	array(
		'{{id}}'      => esc_attr( wp_unique_id( 'luffman-cut-' ) ),
		'{{label}}'   => esc_attr( $attributes['label'] ),
		'{{caption}}' => esc_html( $attributes['caption'] ),
	)
) . '</div>';
