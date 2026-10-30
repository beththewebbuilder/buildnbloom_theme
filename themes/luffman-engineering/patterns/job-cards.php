<?php
/**
 * Title: Job cards
 * Slug: luffman-engineering/job-cards
 * Categories: bnb-base, query
 * Inserter: no
 * Description: Cards of the three latest jobs. Used by the Our work pattern.
 *
 * @package luffman-engineering
 */
?>
<!-- wp:query {"query":{"perPage":3,"pages":0,"offset":0,"postType":"job","order":"desc","orderBy":"date","inherit":false}} -->
<div class="wp-block-query">
<!-- wp:post-template {"layout":{"type":"grid","columnCount":3,"minimumColumnWidth":"18rem"}} -->
<!-- wp:group {"className":"is-style-spec-card","style":{"dimensions":{"minHeight":"100%"}},"layout":{"type":"default"}} -->
<div class="wp-block-group is-style-spec-card" style="min-height:100%">
<!-- wp:post-terms {"term":"sector","textColor":"accent-text","fontFamily":"mono","fontSize":"small"} /-->

<!-- wp:post-title {"level":3,"isLink":true} /-->

<?php foreach ( array( 'job_process' => 'Process', 'job_material' => 'Material', 'job_result' => 'Result' ) as $luffman_key => $luffman_label ) : ?>
<!-- wp:group {"className":"luffman-job-field","layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group luffman-job-field">
<!-- wp:paragraph {"fontFamily":"mono","fontSize":"small"} -->
<p class="has-mono-font-family has-small-font-size"><?php echo $luffman_label; ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"core/post-meta","args":{"key":"<?php echo $luffman_key; ?>"}}}}} -->
<p></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<?php endforeach; ?>
</div>
<!-- /wp:group -->
<!-- /wp:post-template -->
</div>
<!-- /wp:query -->
