<?php
/**
 * Title: Apex header actions
 * Slug: apex-media/header-actions
 * Categories: apex-media, header
 * Inserter: no
 * Description: Phone number and "Start a project" button in the header. Used by the header part.
 *
 * @package apex-media
 */

?>
<!-- wp:group {"className":"apex-header__actions","style":{"spacing":{"blockGap":"var:preset|spacing|40"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group apex-header__actions"><!-- wp:paragraph {"className":"apex-header__phone"} -->
<p class="apex-header__phone"><a href="tel:+447508438855">07508 438855</a></p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"secondary","textColor":"on-secondary","className":"apex-header__cta"} -->
<div class="wp-block-button apex-header__cta"><a class="wp-block-button__link has-on-secondary-color has-secondary-background-color has-text-color has-background wp-element-button" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Start a project</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->
