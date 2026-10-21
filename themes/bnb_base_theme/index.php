<!DOCTYPE html>
<html lang="en">
  <head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="<?php echo esc_attr( get_bloginfo('description') ); ?>">

    <!-- <title> comes from add_theme_support('title-tag') and the favicon from Settings > General > Site Icon -->
    <?php wp_head(); ?>

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