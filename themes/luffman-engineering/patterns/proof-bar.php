<?php
/**
 * Title: Proof bar
 * Slug: luffman-engineering/proof-bar
 * Categories: bnb-base, text
 * Description: Full-width orange band of key facts, using the Stat Bar block.
 *
 * @package luffman-engineering
 */

$luffman_stats = array(
	'Since 1991' => 'Engineering in Devon',
	'6kW'        => 'Fibre laser cutting',
	'4m × 2m'    => 'Largest waterjet bed',
	'±0.2mm'     => 'Laser tolerance',
	'150 tonnes' => 'Folding capacity',
);
?>
<!-- wp:build-n-bloom-blocks/stat-bar {"metadata":{"name":"Proof bar"},"columns":5,"align":"full","backgroundColor":"primary","textColor":"on-primary","style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
<div style="margin-top:0;margin-bottom:0;--bnb-stats-columns:5;--bnb-stats-columns-tablet:2;--bnb-stats-columns-mobile:2" class="wp-block-build-n-bloom-blocks-stat-bar alignfull has-on-primary-color has-primary-background-color has-text-color has-background"><ul class="bnb-stats__items">
<?php foreach ( $luffman_stats as $luffman_value => $luffman_label ) : ?>
<!-- wp:build-n-bloom-blocks/stat-item <?php echo wp_json_encode( array( 'value' => $luffman_value, 'label' => $luffman_label ), JSON_UNESCAPED_UNICODE ); ?> -->
<li class="wp-block-build-n-bloom-blocks-stat-item"><span class="bnb-stat__value"><?php echo $luffman_value; ?></span><span class="bnb-stat__label"><?php echo $luffman_label; ?></span></li>
<!-- /wp:build-n-bloom-blocks/stat-item -->
<?php endforeach; ?>
</ul></div>
<!-- /wp:build-n-bloom-blocks/stat-bar -->
