<?php
/**
 * Title: Footer credits
 * Slug: bnb-base/footer-credits
 * Categories: bnb-base, footer
 * Inserter: no
 * Description: Copyright line with the current year and site name, and the Build'n'Bloom credit. Used by the footer part.
 *
 * @package bnb-base
 */
?>
<!-- wp:paragraph {"align":"center","fontFamily":"heading"} -->
<p class="has-text-align-center has-heading-font-family">&copy; <?php echo esc_html( wp_date( 'Y' ) ); ?> <?php echo esc_html( get_bloginfo( 'name' ) ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","fontSize":"small"} -->
<p class="has-text-align-center has-small-font-size">Website by <a href="https://buildnbloom.co.uk">Build'n'Bloom</a></p>
<!-- /wp:paragraph -->
