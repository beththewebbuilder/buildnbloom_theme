<?php
/**
 * Title: What we do
 * Slug: luffman-engineering/capabilities
 * Categories: bnb-base, services
 * Description: A heading and intro with a Process List of services. Point each row at its service page once those exist.
 *
 * @package luffman-engineering
 */

$luffman_rows = array(
	array( 'Laser cutting', 'Clean, accurate cuts in most metals.', 'Up to 20mm · 3m × 1.5m · ±0.2mm' ),
	array( 'Waterjet cutting', 'Almost any material, with no heat-affected zone.', 'Up to 4m × 2m · ±0.5mm' ),
	array( 'Plasma and gas', 'Lower-cost cutting, including thick steel.', 'Plasma to 20mm · Gas 25mm and above' ),
	array( 'Folding and rolling', 'Sheet folding, sheet rolling and round tube rolling.', 'Up to 150 tonnes · ±0.5° on larger batches' ),
	array( 'Fabrication and welding', 'TIG and MIG welding, plus drilling, tapping, inserts and stud welding.', 'One-offs to production runs' ),
);
?>
<!-- wp:group {"metadata":{"name":"What we do"},"anchor":"capabilities","align":"full","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"}} -->
<div id="capabilities" class="wp-block-group alignfull" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:group {"align":"wide","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide">
<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between","verticalAlignment":"bottom"}} -->
<div class="wp-block-group">
<!-- wp:group {"layout":{"type":"default"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"is-style-eyebrow"} -->
<p class="is-style-eyebrow">What we do</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">From flat sheet<br>to finished part</h2>
<!-- /wp:heading -->
</div>
<!-- /wp:group -->

<!-- wp:paragraph {"style":{"layout":{"selfStretch":"fixed","flexSize":"28rem"}},"textColor":"subtle-text"} -->
<p class="has-subtle-text-color has-text-color">Most of our work comes from repeat customers, in industries from tech to agriculture.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:build-n-bloom-blocks/process-list -->
<div class="wp-block-build-n-bloom-blocks-process-list"><ol class="bnb-process__items">
<?php foreach ( $luffman_rows as $luffman_row ) : ?>
<!-- wp:build-n-bloom-blocks/process-row <?php echo wp_json_encode( array( 'title' => $luffman_row[0], 'text' => $luffman_row[1], 'spec' => $luffman_row[2], 'linkUrl' => '#quote' ), JSON_UNESCAPED_UNICODE ); ?> -->
<li class="wp-block-build-n-bloom-blocks-process-row"><a class="bnb-process__row" href="#quote"><h3 class="bnb-process__title"><?php echo $luffman_row[0]; ?></h3><p class="bnb-process__text"><?php echo $luffman_row[1]; ?></p><p class="bnb-process__spec"><?php echo $luffman_row[2]; ?></p></a></li>
<!-- /wp:build-n-bloom-blocks/process-row -->
<?php endforeach; ?>
</ol></div>
<!-- /wp:build-n-bloom-blocks/process-list -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
