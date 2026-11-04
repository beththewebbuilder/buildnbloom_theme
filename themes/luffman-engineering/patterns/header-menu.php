<?php
/**
 * Title: Header menu
 * Slug: luffman-engineering/header-menu
 * Categories: header
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
<!-- /wp:navigation -->
