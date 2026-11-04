<?php
/**
 * Title: Firepit designer
 * Slug: luffman-engineering/firepit-designer
 * Categories: luffman-engineering, featured
 * Description: Dark section with a Product Configurator set up for firepits. Upload a new pattern by adding a Product Option to the Pattern group. Options, notes, photos and the price can be edited.
 *
 * @package luffman-engineering
 */

$luffman_flags = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;
$luffman_asset = function ( $file ) {
	return get_theme_file_uri( 'assets/firepit/' . $file );
};
$luffman_photo = function ( $file, $alt, $caption ) use ( $luffman_asset ) {
	return array( 'url' => $luffman_asset( $file ), 'alt' => $alt, 'caption' => $caption );
};
$luffman_art = function ( $label, $value, $file, $trim ) use ( $luffman_asset ) {
	return array( 'label' => $label, 'value' => $value, 'image' => $luffman_asset( $file ), 'trim' => $trim );
};
$luffman_render = function ( $label, $value, $file ) use ( $luffman_asset ) {
	return array(
		'label'     => $label,
		'value'     => $value,
		'image'     => $luffman_asset( $file ),
		'imageMode' => 'photo',
		'stageNote' => "This is our 3D render, shown in black. We'll make it in the size and material you choose.",
	);
};

$luffman_groups = array(
	array(
		'label'   => 'Style',
		'key'     => 'style',
		'options' => array(
			array(
				'label'     => 'Round firepit',
				'value'     => 'round',
				'noSummary' => true,
				'photos'    => array(
					$luffman_photo( 'photo-round-patio.jpg', 'Firepit with a cooking grill on a patio', 'On the patio, with cooking plate' ),
					$luffman_photo( 'photo-round-stag-forest.jpg', 'Stag forest firepit in the Luffman workshop', 'Stag forest, fresh from the workshop' ),
					$luffman_photo( 'photo-round-safari.jpg', 'Large firepit with rhinos and acacia trees cut from the steel', 'Safari, in the workshop' ),
				),
			),
			array(
				'label'     => 'Flat-pack firepit and BBQ',
				'value'     => 'flat',
				'summary'   => 'Flat-pack firepit and BBQ, grill plate included',
				'stageNote' => 'Illustration of the flat-pack design. Luffman to confirm the sizes, parts and metals available.',
				'photos'    => array(
					$luffman_photo( 'photo-flat-beach.jpg', 'Flat-pack firepit lit on a sandy beach', 'Lit on the beach' ),
					$luffman_photo( 'photo-flat-charcoal.jpg', 'Flat-pack firepit filled with burning charcoal on grass', 'Open for charcoal' ),
					$luffman_photo( 'photo-flat-grill.jpg', 'Flat-pack firepit with its grill plate in the workshop', 'With the grill plate' ),
					$luffman_photo( 'photo-flat-workshop.jpg', 'Stainless flat-pack firepit seen from above in the workshop', 'Fresh from the workshop' ),
				),
			),
		),
	),
	array(
		'label'    => 'Pattern',
		'key'      => 'pattern',
		'showWhen' => 'style=round',
		'options'  => array(
			$luffman_art( 'Branches with pheasants', 'bp', 'art-branches-pheasants.jpg', '3.2,2.2,11,4' ),
			$luffman_art( 'Stag forest', 'sf', 'art-stag-forest.jpg', '2.5,2,11,6' ),
			$luffman_art( 'Pheasant forest', 'pf', 'art-pheasant-forest.jpg', '3.5,2.2,9,10.5' ),
			$luffman_art( 'Oak leaves', 'ol', 'art-oak-leaves.jpg', '3,2,15,10' ),
			$luffman_art( 'Constellations', 'co', 'art-constellations.jpg', '2.5,2.5,9,14.5' ),
			$luffman_art( 'Forest hunt', 'fh', 'art-forest-hunt.jpg', '3,2,10.5,20' ),
			array(
				'label'     => 'Safari',
				'value'     => 'sa',
				'stageNote' => "Safari preview is a stand-in drawn from a photo. Add Luffman's flat artwork before launch.",
			),
			$luffman_render( 'Branches', 'br', 'render-branches.png' ),
			$luffman_render( 'Ivy', 'iv', 'render-ivy.png' ),
			$luffman_render( 'Hunting', 'hu', 'render-hunting.png' ),
			$luffman_render( 'Flowers', 'fl', 'render-flowers.png' ),
			$luffman_render( 'Starry night', 'sn', 'render-starry-night.png' ),
			array(
				'label'           => 'Your own design',
				'value'           => 'cu',
				'textPrompt'      => 'Describe your design',
				'textPlaceholder' => 'For example: our family name with oak leaves',
				'textUse'         => 'enquiry',
				'uploadLabel'     => 'Add your artwork',
				'uploadHelp'      => "Black-and-white image. We'll wrap it around the preview.",
			),
		),
	),
	array(
		'label'    => 'Size',
		'key'      => 'size',
		'showWhen' => 'style=round',
		'options'  => array(
			array( 'label' => '600mm', 'value' => '600' ),
			array( 'label' => '900mm', 'value' => '900' ),
			array(
				'label'           => 'Other size',
				'value'           => 'other',
				'stageNote'       => 'Preview shown at 600mm.',
				'textPrompt'      => "Diameter you'd like",
				'textPlaceholder' => 'For example: 750mm',
			),
		),
	),
	array(
		'label'   => 'Material',
		'key'     => 'material',
		'options' => array(
			array( 'label' => 'Mild steel', 'value' => 'mild', 'summary' => 'Mild steel, uncoated', 'note' => 'Our lowest-cost option. It slowly rusts outdoors.' ),
			array( 'label' => 'Painted', 'value' => 'paint', 'summary' => 'Mild steel, heat-resistant paint', 'note' => 'Painted mild steel, which rusts after a few years outdoors.' ),
			array( 'label' => '3CR12', 'value' => 's3cr', 'summary' => '3CR12 stainless', 'note' => 'Far outlasts mild steel, with some mild corrosion.' ),
			array( 'label' => '304 stainless', 'value' => 's304', 'summary' => '304 stainless', 'note' => 'Our highest corrosion resistance. It may discolour from heat.' ),
		),
	),
	array(
		'label'    => 'Extras',
		'key'      => 'plate',
		'optional' => true,
		'showWhen' => 'style=round',
		'options'  => array(
			array( 'label' => 'Add a cooking plate', 'value' => 'plate', 'summary' => 'Cooking plate' ),
		),
	),
);

$luffman_settings = array(
	'eyebrow'       => 'Made in Devon, made to order',
	'heading'       => 'Design your firepit',
	'preview'       => 'firepit',
	'previewName'   => 'Your firepit',
	'previewLabel'  => 'Preview of the firepit you have configured',
	'price'         => 'From £ TBC',
	'ctaLabel'      => 'Enquire about this firepit',
	'enquiryPrefix' => 'Firepit enquiry: ',
);

// Data attributes in the same order as the Product Option block saves them
$luffman_option_data = array(
	'value'           => 'data-value',
	'summary'         => 'data-summary',
	'noSummary'       => 'data-no-summary',
	'note'            => 'data-note',
	'stageNote'       => 'data-stage-note',
	'image'           => 'data-image',
	'imageMode'       => 'data-mode',
	'trim'            => 'data-trim',
	'photos'          => 'data-photos',
	'textPrompt'      => 'data-text-prompt',
	'textPlaceholder' => 'data-text-placeholder',
	'textUse'         => 'data-text-use',
	'uploadLabel'     => 'data-upload-label',
	'uploadHelp'      => 'data-upload-help',
);
?>
<!-- wp:group {"metadata":{"name":"Firepit designer"},"anchor":"firepits","align":"full","className":"is-style-dark-section","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"}} -->
<div id="firepits" class="wp-block-group alignfull is-style-dark-section" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:luffman-blocks/product-configurator <?php echo wp_json_encode( array_merge( $luffman_settings, array( 'align' => 'wide' ) ), $luffman_flags ); ?> -->
<div class="wp-block-luffman-blocks-product-configurator alignwide" data-preview="firepit" data-preview-name="<?php echo esc_attr( $luffman_settings['previewName'] ); ?>" data-enquiry-prefix="<?php echo esc_attr( $luffman_settings['enquiryPrefix'] ); ?>"><div class="luffman-config__stage"><div class="luffman-config__preview" role="img" aria-label="<?php echo esc_attr( $luffman_settings['previewLabel'] ); ?>"></div></div><div class="luffman-config__panel"><p class="luffman-eyebrow"><?php echo $luffman_settings['eyebrow']; ?></p><h2 class="luffman-config__heading"><?php echo $luffman_settings['heading']; ?></h2><div class="luffman-config__groups">
<?php foreach ( $luffman_groups as $luffman_group ) : ?>
<!-- wp:luffman-blocks/option-group <?php echo wp_json_encode( array_diff_key( $luffman_group, array( 'options' => true ) ), $luffman_flags ); ?> -->
<fieldset class="wp-block-luffman-blocks-option-group luffman-config__group" data-key="<?php echo esc_attr( $luffman_group['key'] ); ?>"<?php echo empty( $luffman_group['optional'] ) ? '' : ' data-optional="true"'; ?><?php echo empty( $luffman_group['showWhen'] ) ? '' : ' data-show-when="' . esc_attr( $luffman_group['showWhen'] ) . '"'; ?>><legend class="luffman-control-label"><?php echo $luffman_group['label']; ?></legend><div class="luffman-seg">
<?php foreach ( $luffman_group['options'] as $luffman_option ) : ?>
<!-- wp:luffman-blocks/product-option <?php echo wp_json_encode( $luffman_option, $luffman_flags ); ?> -->
<button class="wp-block-luffman-blocks-product-option luffman-seg__button" type="button" aria-pressed="false"
<?php
foreach ( $luffman_option_data as $luffman_key => $luffman_attribute ) {
	if ( ! empty( $luffman_option[ $luffman_key ] ) ) {
		$luffman_value = $luffman_option[ $luffman_key ];
		if ( is_array( $luffman_value ) ) {
			$luffman_value = wp_json_encode( $luffman_value, $luffman_flags );
		} elseif ( true === $luffman_value ) {
			$luffman_value = 'true';
		}
		echo ' ' . $luffman_attribute . '="' . esc_attr( $luffman_value ) . '"';
	}
}
?>
><?php echo $luffman_option['label']; ?></button>
<!-- /wp:luffman-blocks/product-option -->
<?php endforeach; ?>
</div></fieldset>
<!-- /wp:luffman-blocks/option-group -->
<?php endforeach; ?>
</div><p class="luffman-config__summary" aria-live="polite"></p><p class="luffman-config__note"></p><p class="luffman-config__price"><?php echo $luffman_settings['price']; ?></p><a class="luffman-config__cta wp-element-button" href="#quote"><?php echo $luffman_settings['ctaLabel']; ?></a></div></div>
<!-- /wp:luffman-blocks/product-configurator -->
</div>
<!-- /wp:group -->
