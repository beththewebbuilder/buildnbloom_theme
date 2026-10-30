<?php
/**
 * Title: Firepit designer
 * Slug: luffman-engineering/firepit-designer
 * Categories: bnb-base, featured
 * Description: Dark section with a Product Configurator set up for firepits. Options, notes and the price can be edited.
 *
 * @package luffman-engineering
 */

$luffman_flags  = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;
$luffman_groups = array(
	array(
		'label'   => 'Pattern',
		'key'     => 'pattern',
		'options' => array(
			array( 'label' => 'Branches', 'value' => 'branches' ),
			array( 'label' => 'Ivy', 'value' => 'ivy' ),
			array( 'label' => 'Flowers', 'value' => 'flowers' ),
			array( 'label' => 'Starry Night', 'value' => 'stars' ),
		),
	),
	array(
		'label'   => 'Size',
		'key'     => 'size',
		'options' => array(
			array( 'label' => '600mm', 'value' => '600' ),
			array( 'label' => '900mm', 'value' => '900' ),
		),
	),
	array(
		'label'   => 'Material',
		'key'     => 'material',
		'options' => array(
			array( 'label' => 'Mild steel', 'value' => 'mild', 'summary' => 'Mild steel, uncoated', 'note' => 'Our lowest-cost option. It slowly rusts outdoors.' ),
			array( 'label' => 'Painted', 'value' => 'paint', 'summary' => 'Mild steel, heat-resistant paint', 'note' => 'Painted mild steel, which rusts after a few years outdoors.' ),
			array( 'label' => '3CR12', 'value' => 's3cr', 'summary' => '3CR12 stainless', 'note' => 'Outlasts mild steel, with some mild corrosion.' ),
			array( 'label' => '304 stainless', 'value' => 's304', 'summary' => '304 stainless', 'note' => 'Our highest corrosion resistance. It may discolour from heat.' ),
		),
	),
	array(
		'label'    => 'Extras',
		'key'      => 'plate',
		'optional' => true,
		'options'  => array(
			array( 'label' => 'Add a cooking plate', 'value' => 'plate', 'summary' => 'Cooking plate' ),
		),
	),
);

$luffman_settings = array(
	'eyebrow'       => 'Made in Devon, made to order',
	'heading'       => 'Design your firepit',
	'preview'       => 'firepit',
	'previewLabel'  => 'Preview of the firepit you have configured',
	'price'         => 'From £ TBC',
	'ctaLabel'      => 'Enquire about this firepit',
	'enquiryPrefix' => 'Firepit enquiry: ',
);
?>
<!-- wp:group {"metadata":{"name":"Firepit designer"},"anchor":"firepits","align":"full","className":"is-style-dark-section","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"}} -->
<div id="firepits" class="wp-block-group alignfull is-style-dark-section" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:luffman-blocks/product-configurator <?php echo wp_json_encode( array_merge( $luffman_settings, array( 'align' => 'wide' ) ), $luffman_flags ); ?> -->
<div class="wp-block-luffman-blocks-product-configurator alignwide" data-preview="firepit" data-enquiry-prefix="<?php echo esc_attr( $luffman_settings['enquiryPrefix'] ); ?>"><div class="luffman-config__stage"><div class="luffman-config__preview" role="img" aria-label="<?php echo esc_attr( $luffman_settings['previewLabel'] ); ?>"></div></div><div class="luffman-config__panel"><p class="luffman-eyebrow"><?php echo $luffman_settings['eyebrow']; ?></p><h2 class="luffman-config__heading"><?php echo $luffman_settings['heading']; ?></h2><div class="luffman-config__groups">
<?php foreach ( $luffman_groups as $luffman_group ) : ?>
<!-- wp:luffman-blocks/option-group <?php echo wp_json_encode( array_diff_key( $luffman_group, array( 'options' => true ) ), $luffman_flags ); ?> -->
<fieldset class="wp-block-luffman-blocks-option-group luffman-config__group" data-key="<?php echo esc_attr( $luffman_group['key'] ); ?>"<?php echo empty( $luffman_group['optional'] ) ? '' : ' data-optional="true"'; ?>><legend class="luffman-control-label"><?php echo $luffman_group['label']; ?></legend><div class="luffman-seg">
<?php foreach ( $luffman_group['options'] as $luffman_option ) : ?>
<!-- wp:luffman-blocks/product-option <?php echo wp_json_encode( $luffman_option, $luffman_flags ); ?> -->
<button class="wp-block-luffman-blocks-product-option luffman-seg__button" type="button" aria-pressed="false" data-value="<?php echo esc_attr( $luffman_option['value'] ); ?>"<?php echo empty( $luffman_option['summary'] ) ? '' : ' data-summary="' . esc_attr( $luffman_option['summary'] ) . '"'; ?><?php echo empty( $luffman_option['note'] ) ? '' : ' data-note="' . esc_attr( $luffman_option['note'] ) . '"'; ?>><?php echo $luffman_option['label']; ?></button>
<!-- /wp:luffman-blocks/product-option -->
<?php endforeach; ?>
</div></fieldset>
<!-- /wp:luffman-blocks/option-group -->
<?php endforeach; ?>
</div><p class="luffman-config__summary" aria-live="polite"></p><p class="luffman-config__note"></p><p class="luffman-config__price"><?php echo $luffman_settings['price']; ?></p><a class="luffman-config__cta wp-element-button" href="#quote"><?php echo $luffman_settings['ctaLabel']; ?></a></div></div>
<!-- /wp:luffman-blocks/product-configurator -->
</div>
<!-- /wp:group -->
