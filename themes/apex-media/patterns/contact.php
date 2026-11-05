<?php
/**
 * Title: Apex contact
 * Slug: apex-media/contact
 * Categories: apex-media, call-to-action
 * Keywords: contact, enquiry, form, get in touch, call to action
 * Description: The page's closing section: heading, phone, email and studio on the left, and the enquiry form on the right. The form is the Contact Form 7 form titled "Apex enquiry".
 *
 * @package apex-media
 */

?>
<!-- wp:group {"metadata":{"name":"Contact"},"anchor":"contact","align":"full","className":"apex-contact","style":{"color":{"background":"#141414"},"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"textColor":"on-header","layout":{"type":"constrained"}} -->
<div id="contact" class="wp-block-group alignfull apex-contact has-on-header-color has-text-color has-background" style="background-color:#141414;margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)"><!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"48%"} -->
<div class="wp-block-column" style="flex-basis:48%"><!-- wp:heading -->
<h2 class="wp-block-heading">Ready to make something <mark style="background-color:rgba(0, 0, 0, 0);color:#ff4545" class="has-inline-color">great</mark>?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"apex-contact__lede"} -->
<p class="apex-contact__lede">Tell us what you're working on. We'll reply with ideas and a rough budget.</p>
<!-- /wp:paragraph -->

<!-- wp:list {"className":"apex-contact__direct"} -->
<ul class="wp-block-list apex-contact__direct"><!-- wp:list-item -->
<li><strong>Call</strong> <a href="tel:+447508438855">07508 438855</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Email</strong> <a href="mailto:contact@apex-media.uk">contact@apex-media.uk</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Studio</strong> Somerset</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"52%"} -->
<div class="wp-block-column" style="flex-basis:52%"><!-- wp:shortcode -->
[contact-form-7 title="Apex enquiry"]
<!-- /wp:shortcode --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->
