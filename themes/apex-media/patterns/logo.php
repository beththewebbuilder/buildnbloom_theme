<?php
/**
 * Title: Apex logo
 * Slug: apex-media/logo
 * Categories: apex-media, header
 * Inserter: no
 * Description: The logo in the header, linking to the homepage. Shows the Site Logo when one is set in the Site Editor, otherwise the APEX logo that comes with the theme. Used by the header part.
 *
 * @package apex-media
 */

if ( get_option( 'site_logo' ) ) :
	?>
<!-- wp:site-logo {"width":140,"shouldSyncIcon":false,"className":"apex-header__logo"} /-->
	<?php
else :
	?>
<!-- wp:html -->
<a class="apex-header__logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/apex-logo.png' ) ); ?>" width="557" height="160" alt="<?php esc_attr_e( 'APEX Media, home', 'apex-media' ); ?>"></a>
<!-- /wp:html -->
	<?php
endif;
