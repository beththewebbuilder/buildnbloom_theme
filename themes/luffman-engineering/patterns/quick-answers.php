<?php
/**
 * Title: Quick answers
 * Slug: luffman-engineering/quick-answers
 * Categories: bnb-base, text
 * Description: Cards of common questions, each with a table of answers. Cards and table rows can be added or removed.
 *
 * @package luffman-engineering
 */

$luffman_cards = array(
	array(
		'title' => 'Drawings we accept',
		'intro' => 'Anything from a rough sketch to a full 3D CAD file.',
		'rows'  => array(
			'2D parts'        => 'DXF or DWG preferred',
			'3D parts'        => 'STEP (STP) preferred',
			'Scanned artwork' => 'Black and white with clean, well-defined lines. Accepted, but not the most accurate route.',
			'Not accepted'    => 'Native Mac files',
		),
	),
	array(
		'title' => 'Metals in stock',
		'intro' => 'Held in most common metric thicknesses.',
		'rows'  => array(
			'Mild steel'      => 'S275',
			'Stainless steel' => '304, 316',
			'Aluminium'       => '1050, 5083, 6082',
			'Limited stock'   => 'Mild steel S355, brass and copper',
		),
	),
	array(
		'title' => 'Materials we can cut',
		'intro' => 'What we can cut depends on the process.',
		'rows'  => array(
			'Laser'          => 'Ferrous and non-ferrous metals',
			'Gas and plasma' => 'Ferrous metals only',
			'Waterjet'       => 'Almost anything: metals, plastics, composites (not all laminates), wood and plywood, glass (not toughened), stone, concrete, ceramics and rubber',
		),
	),
	array(
		'title' => 'Tolerances',
		'intro' => 'What we can work to on each process.',
		'rows'  => array(
			'Laser'      => '±0.2mm',
			'Waterjet'   => '±0.5mm',
			'Plasma'     => 'TBC',
			'Gas'        => '±1mm',
			'Guillotine' => '±1mm',
			'Bending'    => '±1° one-offs and small batches<br>±0.5° larger batches<br>±2° Durbar',
		),
		'after' => 'Mild steel sheet is bought to EN10029 for thickness and flatness.',
	),
);
?>
<!-- wp:group {"metadata":{"name":"Quick answers"},"anchor":"answers","align":"full","backgroundColor":"muted","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"}} -->
<div id="answers" class="wp-block-group alignfull has-muted-background-color has-background" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:group {"align":"wide","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide">
<!-- wp:paragraph {"className":"is-style-eyebrow"} -->
<p class="is-style-eyebrow">Quick answers</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">What customers ask us most</h2>
<!-- /wp:heading -->

<!-- wp:group {"layout":{"type":"grid","columnCount":2,"minimumColumnWidth":"24rem"}} -->
<div class="wp-block-group">
<?php foreach ( $luffman_cards as $luffman_card ) : ?>
<!-- wp:group {"className":"is-style-spec-card","layout":{"type":"default"}} -->
<div class="wp-block-group is-style-spec-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><?php echo $luffman_card['title']; ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"subtle-text"} -->
<p class="has-subtle-text-color has-text-color"><?php echo $luffman_card['intro']; ?></p>
<!-- /wp:paragraph -->

<!-- wp:table {"className":"is-style-spec-table"} -->
<figure class="wp-block-table is-style-spec-table"><table class="has-fixed-layout"><tbody><?php foreach ( $luffman_card['rows'] as $luffman_label => $luffman_answer ) : ?><tr><td><?php echo $luffman_label; ?></td><td><?php echo $luffman_answer; ?></td></tr><?php endforeach; ?></tbody></table></figure>
<!-- /wp:table -->
<?php if ( ! empty( $luffman_card['after'] ) ) : ?>

<!-- wp:paragraph {"textColor":"subtle-text"} -->
<p class="has-subtle-text-color has-text-color"><?php echo $luffman_card['after']; ?></p>
<!-- /wp:paragraph -->
<?php endif; ?>
</div>
<!-- /wp:group -->

<?php endforeach; ?>
</div>
<!-- /wp:group -->

<!-- wp:paragraph -->
<p>Can't find what you need? Call <a href="tel:01884821076">01884 821076</a> or <a href="#quote">send us your drawing</a>.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
