<?php
/**
 * Title: Get a quote
 * Slug: luffman-engineering/quote
 * Categories: bnb-base, call-to-action
 * Description: Advice on drawing files next to the quote form. The form is the Contact Form 7 form titled "Get a quote".
 *
 * @package luffman-engineering
 */

$luffman_formats = array(
	'2D'     => 'DXF or DWG files are preferred.',
	'3D'     => 'STEP files give the tightest folding tolerances.',
	'Sketch' => "Clean black-and-white artwork can be scanned, though it's less accurate. Native Mac files can't be used.",
);
?>
<!-- wp:group {"metadata":{"name":"Get a quote"},"anchor":"quote","align":"full","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"}} -->
<div id="quote" class="wp-block-group alignfull" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns alignwide">
<!-- wp:column {"width":"45%"} -->
<div class="wp-block-column" style="flex-basis:45%">
<!-- wp:paragraph {"className":"is-style-eyebrow"} -->
<p class="is-style-eyebrow">Get a quote</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Got a drawing? Send it over.</h2>
<!-- /wp:heading -->

<!-- wp:table {"className":"is-style-spec-table"} -->
<figure class="wp-block-table is-style-spec-table"><table class="has-fixed-layout"><tbody><?php foreach ( $luffman_formats as $luffman_format => $luffman_advice ) : ?><tr><td><?php echo $luffman_format; ?></td><td><?php echo $luffman_advice; ?></td></tr><?php endforeach; ?></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph {"textColor":"subtle-text","fontSize":"small"} -->
<p class="has-subtle-text-color has-text-color has-small-font-size">We usually reply within TBC. Prefer to talk? Call <a href="tel:01884821076">01884 821076</a>.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column {"width":"55%"} -->
<div class="wp-block-column" style="flex-basis:55%">
<!-- wp:shortcode -->
[contact-form-7 title="Get a quote"]
<!-- /wp:shortcode -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->
