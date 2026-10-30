<?php
/**
 * Title: Same part, four processes
 * Slug: luffman-engineering/edge-comparison
 * Categories: bnb-base, gallery
 * Description: A heading and an Item Grid comparing the edge finish of each process. Add a macro photo to each card.
 *
 * @package luffman-engineering
 */

$luffman_edges = array(
	'Laser'    => '±0.2mm. Clean, close-tolerance edge.',
	'Waterjet' => '±0.5mm. No heat-affected zone.',
	'Plasma'   => 'Tolerance TBC. Cleaner than gas, looser than laser.',
	'Gas'      => '±1mm. Suits thick steel on a budget.',
);
?>
<!-- wp:group {"metadata":{"name":"Same part, four processes"},"align":"full","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:group {"align":"wide","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide">
<!-- wp:paragraph {"className":"is-style-eyebrow"} -->
<p class="is-style-eyebrow">Same part, four processes</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">See the difference at the edge</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"subtle-text","fontSize":"large"} -->
<p class="has-subtle-text-color has-text-color has-large-font-size">We cut one Luffman test piece on every machine, so you can compare the finish and choose what your job needs.</p>
<!-- /wp:paragraph -->

<!-- wp:build-n-bloom-blocks/item-grid {"columns":4} -->
<div style="--bnb-grid-columns:4;--bnb-grid-columns-tablet:2;--bnb-grid-columns-mobile:1;--bnb-card-aspect-ratio:4/3" class="wp-block-build-n-bloom-blocks-item-grid">
<?php foreach ( $luffman_edges as $luffman_title => $luffman_text ) : ?>
<!-- wp:build-n-bloom-blocks/grid-card <?php echo wp_json_encode( array( 'title' => $luffman_title, 'text' => $luffman_text ), JSON_UNESCAPED_UNICODE ); ?> -->
<div class="wp-block-build-n-bloom-blocks-grid-card"><div class="bnb-card__inner"><div class="bnb-card__body"><h3 class="bnb-card__title"><?php echo $luffman_title; ?></h3><p class="bnb-card__text"><?php echo $luffman_text; ?></p></div></div></div>
<!-- /wp:build-n-bloom-blocks/grid-card -->
<?php endforeach; ?>
</div>
<!-- /wp:build-n-bloom-blocks/item-grid -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
