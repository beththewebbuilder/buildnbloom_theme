<!DOCTYPE html>
<html lang="en">
  <head>

    <title>
      <?php 
        if(!is_home()) {
          wp_title(''); 
          echo ' | ';
        }
      ?>
      <?php echo get_bloginfo('name'); ?>
    </title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="<?php get_bloginfo('description'); ?>">

    <link rel="icon" href="<?php echo get_bloginfo('template_directory'); ?>/images/tlf.jpg">
    <?php wp_head(); ?>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous"></script>
    <script src="https://player.vimeo.com/api/player.js"></script>

  </head>

  <body>

    <?php
        $page = get_posts([
            'name'      => 'home',
            'post_type' => 'page'
        ]);

        // Run the content filters so blocks render and their front-end assets get enqueued
        if ( ! empty( $page ) ) {
            echo apply_filters( 'the_content', $page[0]->post_content );
        }

        wp_footer();?>

</body>
</html>