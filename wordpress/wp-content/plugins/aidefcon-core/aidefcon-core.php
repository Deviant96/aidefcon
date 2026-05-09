<?php
/**
 * Plugin Name:       AI Defcon Core
 * Description:       Core WordPress integration plugin for AI Defcon.
 * Version:           0.1.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            AI Defcon
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       aidefcon-core
 */

if (!defined('ABSPATH')) {
    exit;
}

define('AIDEFCON_CORE_VERSION', '0.1.0');
define('AIDEFCON_CORE_PLUGIN_FILE', __FILE__);

final class Aidefcon_Core_Plugin
{
    private static $instance = null;

    private function __clone()
    {
        throw new RuntimeException('Cannot clone singleton instance.');
    }

    public function __wakeup(): void
    {
        throw new RuntimeException('Cannot deserialize singleton instance.');
    }

    public static function instance(): self
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes(): void
    {
        // Endpoints will be registered in the next implementation step.
    }
}

function aidefcon_core_activate(): void
{
    // Activation hook reserved for setup tasks (tables/options) in future steps.
}

register_activation_hook(__FILE__, 'aidefcon_core_activate');
Aidefcon_Core_Plugin::instance();
