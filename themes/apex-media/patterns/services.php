<?php
/**
 * Title: Apex what we do
 * Slug: apex-media/services
 * Categories: apex-media, services
 * Keywords: services, what we do, cards
 * Description: Heading and intro with four numbered service cards. Each card links to a page; the numbers and "Find out more" are added automatically.
 *
 * @package apex-media
 */

// Links are written as {{home}}/page/ and filled in with this site's address
ob_start();
?>
<!-- wp:group {"metadata":{"name":"What we do"},"align":"full","className":"apex-services","style":{"color":{"background":"#0a0a0a"},"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"},"blockGap":"var:preset|spacing|50"}},"textColor":"on-header","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull apex-services has-on-header-color has-text-color has-background" style="background-color:#0a0a0a;margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)"><!-- wp:group {"align":"wide","className":"apex-services__head","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide apex-services__head"><!-- wp:group {"layout":{"type":"default"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"className":"apex-services__eyebrow","style":{"color":{"text":"#ff4545"},"typography":{"fontWeight":"700","letterSpacing":"0.12em","textTransform":"uppercase"}},"fontSize":"small"} -->
<p class="apex-services__eyebrow has-text-color has-small-font-size" style="color:#ff4545;font-weight:700;letter-spacing:0.12em;text-transform:uppercase">What we do</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Video with a job to do</h2>
<!-- /wp:heading --></div>
<!-- /wp:group -->

<!-- wp:paragraph {"className":"apex-services__lede"} -->
<p class="apex-services__lede">Pick the kind of work you need, or <a href="{{home}}/contact/">tell us the goal</a> and we'll suggest the right approach.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:build-n-bloom-blocks/item-grid {"columns":4,"gap":3,"align":"wide","className":"apex-services__grid"} -->
<div class="wp-block-build-n-bloom-blocks-item-grid alignwide apex-services__grid" style="--bnb-grid-columns:4;--bnb-grid-columns-tablet:2;--bnb-grid-columns-mobile:1;--bnb-card-aspect-ratio:4/3;--bnb-grid-gap:1rem"><!-- wp:build-n-bloom-blocks/grid-card {"title":"Brand films","text":"Tell your story in a way customers remember.","linkUrl":"{{home}}/services/"} -->
<div class="wp-block-build-n-bloom-blocks-grid-card"><a class="bnb-card__inner" href="{{home}}/services/"><div class="bnb-card__body"><h3 class="bnb-card__title">Brand films</h3><p class="bnb-card__text">Tell your story in a way customers remember.</p></div></a></div>
<!-- /wp:build-n-bloom-blocks/grid-card -->

<!-- wp:build-n-bloom-blocks/grid-card {"title":"Social content","text":"Short-form video made for each platform.","linkUrl":"{{home}}/services/"} -->
<div class="wp-block-build-n-bloom-blocks-grid-card"><a class="bnb-card__inner" href="{{home}}/services/"><div class="bnb-card__body"><h3 class="bnb-card__title">Social content</h3><p class="bnb-card__text">Short-form video made for each platform.</p></div></a></div>
<!-- /wp:build-n-bloom-blocks/grid-card -->

<!-- wp:build-n-bloom-blocks/grid-card {"title":"Events and launches","text":"Capture the day and keep it working afterwards.","linkUrl":"{{home}}/services/"} -->
<div class="wp-block-build-n-bloom-blocks-grid-card"><a class="bnb-card__inner" href="{{home}}/services/"><div class="bnb-card__body"><h3 class="bnb-card__title">Events and launches</h3><p class="bnb-card__text">Capture the day and keep it working afterwards.</p></div></a></div>
<!-- /wp:build-n-bloom-blocks/grid-card -->

<!-- wp:build-n-bloom-blocks/grid-card {"title":"Product and commercial","text":"Show what you make at its best.","linkUrl":"{{home}}/services/"} -->
<div class="wp-block-build-n-bloom-blocks-grid-card"><a class="bnb-card__inner" href="{{home}}/services/"><div class="bnb-card__body"><h3 class="bnb-card__title">Product and commercial</h3><p class="bnb-card__text">Show what you make at its best.</p></div></a></div>
<!-- /wp:build-n-bloom-blocks/grid-card --></div>
<!-- /wp:build-n-bloom-blocks/item-grid --></div>
<!-- /wp:group -->
<?php
echo str_replace( '{{home}}', esc_url( untrailingslashit( home_url() ) ), ob_get_clean() );
