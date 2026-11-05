<?php
/**
 * Title: Apex footer
 * Slug: apex-media/footer
 * Categories: apex-media, footer
 * Inserter: no
 * Description: Logo and a line about Apex, the menu, contact details, and the copyright and Build'n'Bloom credit. Used by the footer part.
 *
 * @package apex-media
 */

?>
<!-- wp:columns {"align":"wide","className":"apex-footer__columns","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|50","top":"var:preset|spacing|40"}}}} -->
<div class="wp-block-columns alignwide apex-footer__columns"><!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%"><!-- wp:pattern {"slug":"apex-media/logo"} /-->

<!-- wp:paragraph {"className":"apex-footer__about"} -->
<p class="apex-footer__about">Results-driven video production from Somerset. <a href="<?php echo esc_url( home_url( '/about/' ) ); ?>">About us →</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"30%"} -->
<div class="wp-block-column" style="flex-basis:30%"><!-- wp:heading {"className":"apex-footer__heading"} -->
<h2 class="wp-block-heading apex-footer__heading">Explore</h2>
<!-- /wp:heading -->

<!-- wp:navigation {"overlayMenu":"never","className":"apex-footer__menu","layout":{"type":"flex","orientation":"vertical"}} /--></div>
<!-- /wp:column -->

<!-- wp:column {"width":"30%"} -->
<div class="wp-block-column" style="flex-basis:30%"><!-- wp:heading {"className":"apex-footer__heading"} -->
<h2 class="wp-block-heading apex-footer__heading">Get in touch</h2>
<!-- /wp:heading -->

<!-- wp:list {"className":"apex-footer__contact"} -->
<ul class="wp-block-list apex-footer__contact"><!-- wp:list-item -->
<li><a href="tel:+447508438855">07508 438855</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="mailto:contact@apex-media.uk">contact@apex-media.uk</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Start a project →</a></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:group {"align":"wide","className":"apex-footer__legal","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group alignwide apex-footer__legal"><!-- wp:paragraph -->
<p>&copy; <?php echo esc_html( wp_date( 'Y' ) ); ?> <?php echo esc_html( get_bloginfo( 'name' ) ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Website by <a href="https://buildnbloom.co.uk">Build'n'Bloom</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->
