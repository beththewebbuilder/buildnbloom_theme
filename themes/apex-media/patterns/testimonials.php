<?php
/**
 * Title: Apex testimonials
 * Slug: apex-media/testimonials
 * Categories: apex-media, testimonials
 * Keywords: testimonials, reviews, quotes, clients
 * Description: Three client reviews as cards, each with a photo of the person, their role and a link to the project. Three across on desktop; on phones they swipe one at a time.
 *
 * @package apex-media
 */

// Links are written as {{home}}/page/ and filled in with this site's address
ob_start();
?>
<!-- wp:group {"metadata":{"name":"Testimonials"},"align":"full","className":"apex-testimonials","style":{"color":{"background":"#0a0a0a"},"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"},"blockGap":"var:preset|spacing|50"}},"textColor":"on-header","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull apex-testimonials has-on-header-color has-text-color has-background" style="background-color:#0a0a0a;margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)"><!-- wp:group {"align":"wide","className":"apex-testimonials__head","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide apex-testimonials__head"><!-- wp:paragraph {"className":"apex-testimonials__eyebrow","style":{"color":{"text":"#ff4545"},"typography":{"fontWeight":"700","letterSpacing":"0.12em","textTransform":"uppercase"}},"fontSize":"small"} -->
<p class="apex-testimonials__eyebrow has-text-color has-small-font-size" style="color:#ff4545;font-weight:700;letter-spacing:0.12em;text-transform:uppercase">Testimonials</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Don't take our word for it</h2>
<!-- /wp:heading --></div>
<!-- /wp:group -->

<!-- wp:build-n-bloom-blocks/carousel {"slideType":"review","slidesPerView":3,"tabletSlidesPerView":2,"showArrows":false,"showDots":true,"loop":false,"align":"wide","className":"apex-testimonials__reviews"} -->
<div class="wp-block-build-n-bloom-blocks-carousel alignwide apex-testimonials__reviews" style="--bnb-carousel-slides:3;--bnb-carousel-slides-tablet:2;--bnb-carousel-slides-mobile:1;--bnb-carousel-image-fit:cover" role="region" aria-roledescription="carousel" aria-label="Carousel"><div class="bnb-carousel__track"><!-- wp:build-n-bloom-blocks/review-item {"imageUrl":"https://apex-media.uk/wp-content/uploads/2025/07/Olly-CT-576x1024.jpg","focalPoint":{"x":0.5,"y":0.2},"review":"“Over the last 6 years APEX Media has totally elevated the Van Haven brand with their stunning video content and expertise.”","author":"\u003cstrong\u003eOlly C-T\u003c/strong\u003e\u003cbr\u003eHead of Design, Van Haven","linkUrl":"{{home}}/van-haven-the-shillingstone-launch-campaign/","linkText":"See the project →"} -->
<div class="wp-block-build-n-bloom-blocks-review-item" style="--bnb-review-focal-point:50% 20%"><div class="bnb-review__image"><img src="https://apex-media.uk/wp-content/uploads/2025/07/Olly-CT-576x1024.jpg" alt=""/></div><p class="bnb-review__text">“Over the last 6 years APEX Media has totally elevated the Van Haven brand with their stunning video content and expertise.”</p><p class="bnb-review__author"><strong>Olly C-T</strong><br>Head of Design, Van Haven</p><a class="bnb-review__link" href="{{home}}/van-haven-the-shillingstone-launch-campaign/">See the project →</a></div>
<!-- /wp:build-n-bloom-blocks/review-item -->

<!-- wp:build-n-bloom-blocks/review-item {"imageUrl":"https://apex-media.uk/wp-content/uploads/2023/02/Showreel-Edit.00_07_53_12.Still008-576x1024.jpg","focalPoint":{"x":0.5,"y":0.2},"review":"“The team have consistently helped us increase sales with first-class videography, which tells our story and persuades our audiences to act.”","author":"\u003cstrong\u003eJames Ford\u003c/strong\u003e\u003cbr\u003eCo-founder, Autobead","linkUrl":"{{home}}/autobead/","linkText":"See the project →"} -->
<div class="wp-block-build-n-bloom-blocks-review-item" style="--bnb-review-focal-point:50% 20%"><div class="bnb-review__image"><img src="https://apex-media.uk/wp-content/uploads/2023/02/Showreel-Edit.00_07_53_12.Still008-576x1024.jpg" alt=""/></div><p class="bnb-review__text">“The team have consistently helped us increase sales with first-class videography, which tells our story and persuades our audiences to act.”</p><p class="bnb-review__author"><strong>James Ford</strong><br>Co-founder, Autobead</p><a class="bnb-review__link" href="{{home}}/autobead/">See the project →</a></div>
<!-- /wp:build-n-bloom-blocks/review-item -->

<!-- wp:build-n-bloom-blocks/review-item {"imageUrl":"https://apex-media.uk/wp-content/uploads/2023/02/tlfrich-576x1024.jpg","focalPoint":{"x":0.5,"y":0.2},"review":"“APEX Media are a fantastic team to work with, their attention to detail is incredible.”","author":"\u003cstrong\u003eRichard Balman\u003c/strong\u003e\u003cbr\u003eFounder, The Lost Foundry","linkUrl":"{{home}}/the-lost-foundry/","linkText":"See the project →"} -->
<div class="wp-block-build-n-bloom-blocks-review-item" style="--bnb-review-focal-point:50% 20%"><div class="bnb-review__image"><img src="https://apex-media.uk/wp-content/uploads/2023/02/tlfrich-576x1024.jpg" alt=""/></div><p class="bnb-review__text">“APEX Media are a fantastic team to work with, their attention to detail is incredible.”</p><p class="bnb-review__author"><strong>Richard Balman</strong><br>Founder, The Lost Foundry</p><a class="bnb-review__link" href="{{home}}/the-lost-foundry/">See the project →</a></div>
<!-- /wp:build-n-bloom-blocks/review-item --></div><div class="bnb-carousel__dots"></div></div>
<!-- /wp:build-n-bloom-blocks/carousel --></div>
<!-- /wp:group -->
<?php
echo str_replace( '{{home}}', esc_url( untrailingslashit( home_url() ) ), ob_get_clean() );
