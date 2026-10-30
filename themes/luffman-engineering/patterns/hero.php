<?php
/**
 * Title: Luffman hero
 * Slug: luffman-engineering/hero
 * Categories: bnb-base, banner
 * Description: Full-width dark hero with a headline, two buttons and an image. Text, links and image can be edited; the layout is locked.
 *
 * @package luffman-engineering
 */
?>
<!-- wp:group {"metadata":{"name":"Hero"},"align":"full","templateLock":"contentOnly","backgroundColor":"header","textColor":"on-header","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-on-header-color has-header-background-color has-text-color has-background" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">
<!-- wp:columns {"verticalAlignment":"center","align":"wide"} -->
<div class="wp-block-columns alignwide are-vertically-aligned-center">
<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center">
<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Send the drawing. <mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-primary-color">We'll cut the steel.</mark></h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"large"} -->
<p class="has-large-font-size">Cutting, folding, rolling and welding from our Devon workshop, for one-off parts and full production runs.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#quote">Upload your drawing</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="#picker">Find the right process</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center">
<!-- wp:image {"sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/hero-cut-part.svg' ) ); ?>" alt="A steel bracket cut from a sheet, shown with its drawing dimensions"/></figure>
<!-- /wp:image -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->
