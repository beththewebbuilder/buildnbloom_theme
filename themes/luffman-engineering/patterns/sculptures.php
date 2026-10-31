<?php
/**
 * Title: Sculptures
 * Slug: luffman-engineering/sculptures
 * Categories: bnb-base, gallery
 * Description: A heading, a mosaic of captioned photos and a button to the quote form. Photos can be replaced or added in the gallery.
 *
 * @package luffman-engineering
 */

$luffman_image = static function ( $file ) {
	return esc_url( get_theme_file_uri( 'assets/sculptures/' . $file ) );
};
?>
<!-- wp:group {"metadata":{"name":"Sculptures"},"anchor":"sculptures","align":"full","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"}} -->
<div id="sculptures" class="wp-block-group alignfull" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:group {"align":"wide","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide">
<!-- wp:group {"className":"luffman-section-head","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between","verticalAlignment":"bottom"}} -->
<div class="wp-block-group luffman-section-head">
<!-- wp:group {"layout":{"type":"default"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"is-style-eyebrow"} -->
<p class="is-style-eyebrow">We also make sculptures</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Some of our work has antlers.<br>Some has teeth.</h2>
<!-- /wp:heading -->
</div>
<!-- /wp:group -->

<!-- wp:paragraph {"textColor":"subtle-text","fontSize":"large"} -->
<p class="has-subtle-text-color has-text-color has-large-font-size">Stags, dinosaurs and one-off pieces, cut and built in our Devon workshop. Here are a few we've made.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:gallery {"columns":3,"linkTo":"none","className":"is-style-mosaic"} -->
<figure class="wp-block-gallery has-nested-images columns-3 is-cropped is-style-mosaic">
<!-- wp:image {"linkDestination":"none"} -->
<figure class="wp-block-image"><img src="<?php echo $luffman_image( 'mirror-stag.jpg' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>" alt="Mirror-finish steel stag standing on a lawn beside a stone cottage"/><figcaption class="wp-element-caption">Mirror-finish stag</figcaption></figure>
<!-- /wp:image -->

<!-- wp:image {"linkDestination":"none"} -->
<figure class="wp-block-image"><img src="<?php echo $luffman_image( 'horned-dinosaur.webp' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>" alt="Large steel horned dinosaur sculpture on grass in a woodland clearing"/><figcaption class="wp-element-caption">Horned dinosaur</figcaption></figure>
<!-- /wp:image -->

<!-- wp:image {"linkDestination":"none"} -->
<figure class="wp-block-image"><img src="<?php echo $luffman_image( 'trex-skeleton-close.jpg' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>" alt="Close-up of a cream slot-together T. rex skull and ribs"/><figcaption class="wp-element-caption">T. rex close-up</figcaption></figure>
<!-- /wp:image -->

<!-- wp:image {"linkDestination":"none"} -->
<figure class="wp-block-image"><img src="<?php echo $luffman_image( 'trex-skeleton.jpg' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>" alt="Cream slot-together T. rex skeleton standing on a wooden floor"/><figcaption class="wp-element-caption">Slot-together T. rex skeleton</figcaption></figure>
<!-- /wp:image -->
</figure>
<!-- /wp:gallery -->

<!-- wp:group {"className":"luffman-cta-row","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group luffman-cta-row">
<!-- wp:paragraph -->
<p>Got something in mind? Get in touch to find out more.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( home_url( '/?details=Sculpture%20enquiry%3A%20#quote' ) ); ?>">Talk to us about a sculpture</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
