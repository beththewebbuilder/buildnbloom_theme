<?php
/**
 * Title: Header menu
 * Slug: luffman-engineering/header-menu
 * Categories: luffman-engineering, header
 * Inserter: no
 * Description: Links to the sections of the homepage. Used by the header part.
 *
 * @package luffman-engineering
 */

$luffman_links = array(
	'Quick answers'  => 'answers',
	'Capabilities'   => 'capabilities',
	'Process finder' => 'picker',
	'Firepits'       => 'firepits',
	'Projects'     => 'sculptures',
);
?>
<!-- wp:navigation {"overlayBackgroundColor":"header","overlayTextColor":"on-header","layout":{"type":"flex","justifyContent":"right"}} -->
<?php foreach ( $luffman_links as $luffman_label => $luffman_anchor ) : ?>
<!-- wp:navigation-link <?php echo wp_json_encode( array( 'label' => $luffman_label, 'url' => home_url( '/#' . $luffman_anchor ), 'kind' => 'custom', 'isTopLevelLink' => true ), JSON_UNESCAPED_SLASHES ); ?> /-->
<?php endforeach; ?>

<!-- The phone number and quote button are only shown in the opened menu, as the header hides them on small screens -->
<!-- wp:navigation-link {"label":"Call 01884 821076","url":"tel:01884821076","kind":"custom","isTopLevelLink":true,"className":"luffman-menu-phone"} /-->

<!-- wp:buttons {"className":"luffman-menu-quote"} -->
<div class="wp-block-buttons luffman-menu-quote">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( home_url( '/#quote' ) ); ?>">Get a quote</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
<!-- /wp:navigation -->
