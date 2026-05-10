<?php
/**
 * AI Defcon Theme Functions
 *
 * This theme serves the React SPA (Single Page Application).
 * All routing is handled by React Router on the client side.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Disable WordPress theme features not needed for SPA.
 */
add_theme_support( 'title-tag' );
add_theme_support( 'post-thumbnails' );

/**
 * Setup localization for API endpoints.
 * The React app can access this via window.aidefconConfig
 */
add_action( 'wp_head', function() {
    $config = array(
        'apiUrl' => rest_url( 'aidefcon/v1' ),
        'siteUrl' => home_url(),
        'wpJsonUrl' => rest_url(),
    );
    ?>
    <script>
        window.aidefconConfig = <?php echo wp_json_encode( $config ); ?>;
    </script>
    <?php
}, 1 );
