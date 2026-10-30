<?php
/**
 * Title: Process finder
 * Slug: luffman-engineering/process-finder
 * Categories: bnb-base, featured
 * Description: Dark section where visitors choose a material, thickness and priority to find a process. The rules are set on each Finder Process block.
 *
 * @package luffman-engineering
 */

$luffman_flags    = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;
$luffman_metals   = array( 'Mild steel', 'Stainless', 'Aluminium', 'Brass / copper' );
$luffman_all      = array_merge( $luffman_metals, array( 'Non-metal' ) );
$luffman_priority = array( 'Accuracy', 'No heat marks', 'Lowest cost' );

$luffman_processes = array(
	array(
		'name'         => 'Laser',
		'why'          => 'High accuracy and a clean cut, ideal for detailed parts in most metals.',
		'tolerance'    => '±0.2mm',
		'thickness'    => 'Up to 20mm',
		'bedSize'      => '3m × 1.5m',
		'materials'    => $luffman_metals,
		'maxThickness' => 20,
		'ranks'        => array( 'Accuracy' => 1, 'No heat marks' => 2, 'Lowest cost' => 4 ),
	),
	array(
		'name'      => 'Waterjet',
		'why'       => 'Cuts almost any material with no heat-affected zone and very fine detail.',
		'tolerance' => '±0.5mm',
		'thickness' => 'Almost no limit',
		'bedSize'   => '4m × 2m',
		'materials' => $luffman_all,
		'ranks'     => array( 'Accuracy' => 2, 'No heat marks' => 1, 'Lowest cost' => 5 ),
	),
	array(
		'name'         => 'Plasma',
		'why'          => 'A cost-effective option when the tightest tolerance isn’t critical.',
		'tolerance'    => 'TBC',
		'thickness'    => 'Up to 20mm',
		'bedSize'      => '3m × 1.5m',
		'materials'    => array( 'Mild steel', 'Stainless' ),
		'maxThickness' => 20,
		'ranks'        => array( 'Accuracy' => 3, 'No heat marks' => 3, 'Lowest cost' => 3 ),
	),
	array(
		'name'         => 'Gas',
		'why'          => 'A low-cost way to cut thick steel where edge quality is less critical.',
		'tolerance'    => '±1mm',
		'thickness'    => '25mm and above',
		'bedSize'      => 'TBC',
		'materials'    => array( 'Mild steel' ),
		'minThickness' => 25,
		'ranks'        => array( 'Accuracy' => 4, 'No heat marks' => 4, 'Lowest cost' => 2 ),
	),
	array(
		'name'         => 'Guillotine',
		'why'          => 'The quickest route for simple square blanks, like gutters, stair treads and troughs.',
		'tolerance'    => '±1mm',
		'thickness'    => 'Up to 6mm',
		'bedSize'      => '3m length',
		'materials'    => $luffman_metals,
		'maxThickness' => 6,
		'ranks'        => array( 'Lowest cost' => 1 ),
	),
);

$luffman_no_match = "We don't have a standard process for this job. Call us and we'll talk it through.";
?>
<!-- wp:group {"metadata":{"name":"Process finder"},"anchor":"picker","align":"full","className":"is-style-dark-section","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"}} -->
<div id="picker" class="wp-block-group alignfull is-style-dark-section" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:luffman-blocks/process-finder {"align":"wide"} -->
<div class="wp-block-luffman-blocks-process-finder alignwide" data-materials="<?php echo esc_attr( wp_json_encode( $luffman_all, $luffman_flags ) ); ?>" data-priorities="<?php echo esc_attr( wp_json_encode( $luffman_priority, $luffman_flags ) ); ?>" data-min="1" data-max="80" data-default="6" data-no-match="<?php echo esc_attr( $luffman_no_match ); ?>"><div class="luffman-finder__intro"><p class="luffman-eyebrow">Process finder</p><h2 class="luffman-finder__heading">Which cut suits your job?</h2><div class="luffman-finder__controls"></div></div><div class="luffman-finder__panel"><div class="luffman-finder__result" aria-live="polite"><ul class="luffman-finder__processes">
<?php foreach ( $luffman_processes as $luffman_process ) : ?>
<!-- wp:luffman-blocks/finder-process <?php echo wp_json_encode( $luffman_process, $luffman_flags ); ?> -->
<li class="wp-block-luffman-blocks-finder-process luffman-finder__process" data-materials="<?php echo esc_attr( wp_json_encode( $luffman_process['materials'], $luffman_flags ) ); ?>" data-min="<?php echo (int) ( $luffman_process['minThickness'] ?? 0 ); ?>" data-max="<?php echo (int) ( $luffman_process['maxThickness'] ?? 0 ); ?>" data-ranks="<?php echo esc_attr( wp_json_encode( $luffman_process['ranks'], $luffman_flags ) ); ?>"><h3 class="luffman-finder__name"><?php echo $luffman_process['name']; ?></h3><p class="luffman-finder__why"><?php echo $luffman_process['why']; ?></p><dl class="luffman-finder__facts"><div><dt>Tolerance</dt><dd><?php echo $luffman_process['tolerance']; ?></dd></div><div><dt>Thickness</dt><dd><?php echo $luffman_process['thickness']; ?></dd></div><div><dt>Bed size</dt><dd><?php echo $luffman_process['bedSize']; ?></dd></div></dl></li>
<!-- /wp:luffman-blocks/finder-process -->
<?php endforeach; ?>
</ul><p class="luffman-finder__also"></p></div></div></div>
<!-- /wp:luffman-blocks/process-finder -->
</div>
<!-- /wp:group -->
