<?php
/**
 * Title: Header actions
 * Slug: luffman-engineering/header-actions
 * Categories: header
 * Inserter: no
 * Description: Phone number and quote button in the header. Used by the header part.
 *
 * @package luffman-engineering
 */
?>
<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|40"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"luffman-header__phone","fontFamily":"mono","fontSize":"small"} -->
<p class="luffman-header__phone has-mono-font-family has-small-font-size"><a href="tel:01884821076">01884 821076</a></p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"style":{"typography":{"fontSize":"1rem"}}} -->
<div class="wp-block-button has-custom-font-size" style="font-size:1rem"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( home_url( '/#quote' ) ); ?>">Get a quote</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
