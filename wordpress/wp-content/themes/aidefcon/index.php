<?php
/**
 * AI Defcon Theme Template
 *
 * This file serves the React SPA (Single Page Application).
 * All routing is handled by React Router on the client side.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Get the built React app's index.html
$react_index = get_template_directory() . '/index.html';

if ( file_exists( $react_index ) ) {
    // Get the WordPress base path (e.g., /aidefcon_site/ or just /)
    $base_path = wp_parse_url( home_url( '/' ), PHP_URL_PATH );
    
    // Read React app and inject base path
    $html = file_get_contents( $react_index );
    $base_script = '<script>window.AIDEFCON_BASE_PATH = ' . json_encode( $base_path ) . ';</script>';
    $html = str_replace( '<head>', '<head>' . $base_script, $html );
    
    echo $html;
} else {
    // Fallback if React app isn't built
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Defcon — CTF Platform</title>
    </head>
    <body>
        <div id="root" style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
            <h1>AI Defcon</h1>
            <p style="color: red;">Error: React app not built yet.</p>
            <p>Run <code>npm run build</code> from the project root to build the app.</p>
        </div>
    </body>
    </html>
    <?php
}
