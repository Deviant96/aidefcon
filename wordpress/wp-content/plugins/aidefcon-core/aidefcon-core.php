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
define('AIDEFCON_CORE_REST_NAMESPACE', 'aidefcon/v1');
define('AIDEFCON_CORE_DB_VERSION', '0.1.0');

final class Aidefcon_Core_Plugin
{
    private static $instance = null;

    private function __clone(): void
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
        add_action('init', [$this, 'register_post_types']);
    }

    public function register_post_types(): void
    {
        register_post_type('aidf_challenge', [
            'labels' => [
                'name' => 'Challenges',
                'singular_name' => 'Challenge',
                'add_new_item' => 'Add New Challenge',
                'edit_item' => 'Edit Challenge',
                'new_item' => 'New Challenge',
                'view_item' => 'View Challenge',
                'search_items' => 'Search Challenges',
                'not_found' => 'No challenges found',
                'menu_name' => 'AI Defcon Challenges',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => true,
            'menu_icon' => 'dashicons-shield-alt',
            'supports' => ['title', 'editor', 'excerpt', 'custom-fields'],
            'has_archive' => false,
            'rewrite' => false,
        ]);

        register_post_type('aidf_announcement', [
            'labels' => [
                'name' => 'Announcements',
                'singular_name' => 'Announcement',
                'add_new_item' => 'Add New Announcement',
                'edit_item' => 'Edit Announcement',
                'new_item' => 'New Announcement',
                'view_item' => 'View Announcement',
                'search_items' => 'Search Announcements',
                'not_found' => 'No announcements found',
                'menu_name' => 'AI Defcon Announcements',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => true,
            'menu_icon' => 'dashicons-megaphone',
            'supports' => ['title', 'editor', 'excerpt', 'custom-fields'],
            'has_archive' => false,
            'rewrite' => false,
        ]);
    }

    public function register_routes(): void
    {
        register_rest_route(AIDEFCON_CORE_REST_NAMESPACE, '/auth/otp-request', [
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => [$this, 'otp_request'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route(AIDEFCON_CORE_REST_NAMESPACE, '/auth/otp-verify', [
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => [$this, 'otp_verify'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route(AIDEFCON_CORE_REST_NAMESPACE, '/challenges', [
            'methods' => WP_REST_Server::READABLE,
            'callback' => [$this, 'get_challenges'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route(AIDEFCON_CORE_REST_NAMESPACE, '/challenges/(?P<id>\\d+)/submit', [
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => [$this, 'submit_flag'],
            'permission_callback' => [$this, 'require_login'],
        ]);

        register_rest_route(AIDEFCON_CORE_REST_NAMESPACE, '/scoreboard', [
            'methods' => WP_REST_Server::READABLE,
            'callback' => [$this, 'get_scoreboard'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route(AIDEFCON_CORE_REST_NAMESPACE, '/teams', [
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => [$this, 'create_team'],
            'permission_callback' => [$this, 'require_login'],
        ]);

        register_rest_route(AIDEFCON_CORE_REST_NAMESPACE, '/teams/join', [
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => [$this, 'join_team'],
            'permission_callback' => [$this, 'require_login'],
        ]);

        register_rest_route(AIDEFCON_CORE_REST_NAMESPACE, '/profile', [
            'methods' => WP_REST_Server::READABLE,
            'callback' => [$this, 'get_profile'],
            'permission_callback' => [$this, 'require_login'],
        ]);
    }

    public function require_login(): bool
    {
        return is_user_logged_in();
    }

    public function otp_request(WP_REST_Request $request): WP_REST_Response
    {
        $email = sanitize_email((string) $request->get_param('email'));

        if (empty($email) || !is_email($email)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'A valid email is required.',
            ], 400);
        }

        return new WP_REST_Response([
            'success' => true,
            'message' => 'OTP request accepted (mock).',
            'expires_in' => 300,
        ], 200);
    }

    public function otp_verify(WP_REST_Request $request): WP_REST_Response
    {
        $email = sanitize_email((string) $request->get_param('email'));
        $otp = preg_replace('/\D+/', '', (string) $request->get_param('otp'));

        if (empty($email) || !is_email($email) || strlen((string) $otp) < 4) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'Invalid email or OTP.',
            ], 400);
        }

        return new WP_REST_Response([
            'success' => true,
            'message' => 'OTP verified (mock).',
            'token' => 'mock-session-token',
        ], 200);
    }

    public function get_challenges(): WP_REST_Response
    {
        return new WP_REST_Response([
            'success' => true,
            'items' => [
                [
                    'id' => 1,
                    'title' => 'SQLi Warmup',
                    'category' => 'Web',
                    'points' => 100,
                    'difficulty' => 'easy',
                    'solved' => 42,
                ],
                [
                    'id' => 2,
                    'title' => 'Tiny ROP',
                    'category' => 'Pwn',
                    'points' => 250,
                    'difficulty' => 'medium',
                    'solved' => 17,
                ],
            ],
        ], 200);
    }

    public function submit_flag(WP_REST_Request $request): WP_REST_Response
    {
        $challenge_id = (int) $request['id'];
        $flag = sanitize_text_field((string) $request->get_param('flag'));

        if ($challenge_id <= 0 || empty($flag)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'Challenge ID and flag are required.',
            ], 400);
        }

        $is_correct = strcasecmp($flag, 'AIDF{MOCK_FLAG}') === 0;

        return new WP_REST_Response([
            'success' => $is_correct,
            'message' => $is_correct ? 'Correct flag (mock).' : 'Incorrect flag (mock).',
            'challenge_id' => $challenge_id,
            'awarded_points' => $is_correct ? 100 : 0,
        ], $is_correct ? 200 : 422);
    }

    public function get_scoreboard(): WP_REST_Response
    {
        return new WP_REST_Response([
            'success' => true,
            'items' => [
                [
                    'rank' => 1,
                    'team' => 'Null Pointers',
                    'points' => 1380,
                    'solved' => 11,
                    'status' => 'active',
                ],
                [
                    'rank' => 2,
                    'team' => 'Heap Spray',
                    'points' => 1260,
                    'solved' => 10,
                    'status' => 'active',
                ],
            ],
        ], 200);
    }

    public function create_team(WP_REST_Request $request): WP_REST_Response
    {
        $team_name = sanitize_text_field((string) $request->get_param('team_name'));

        if (strlen($team_name) < 3) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'Team name must be at least 3 characters.',
            ], 400);
        }

        return new WP_REST_Response([
            'success' => true,
            'team' => [
                'id' => 1001,
                'name' => $team_name,
                'access_token' => 'AIDF-7KX9-PQ2M',
                'captain_id' => get_current_user_id(),
            ],
        ], 201);
    }

    public function join_team(WP_REST_Request $request): WP_REST_Response
    {
        $token = strtoupper(sanitize_text_field((string) $request->get_param('access_token')));

        if (!preg_match('/^AIDF-[A-Z0-9]{4}-[A-Z0-9]{4}$/', $token)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'Invalid team access token format.',
            ], 400);
        }

        return new WP_REST_Response([
            'success' => true,
            'message' => 'Team joined (mock).',
            'team' => [
                'id' => 1001,
                'name' => 'Mock Team',
            ],
        ], 200);
    }

    public function get_profile(): WP_REST_Response
    {
        $user = wp_get_current_user();

        return new WP_REST_Response([
            'success' => true,
            'profile' => [
                'id' => $user->ID,
                'username' => $user->user_login,
                'email' => $user->user_email,
                'display_name' => $user->display_name,
                'team' => [
                    'id' => 1001,
                    'name' => 'Mock Team',
                    'role' => 'member',
                ],
            ],
        ], 200);
    }
}

function aidefcon_core_activate(): void
{
    global $wpdb;

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';

    $charset_collate = $wpdb->get_charset_collate();

    $teams_table = $wpdb->prefix . 'aidf_teams';
    $members_table = $wpdb->prefix . 'aidf_members';
    $submissions_table = $wpdb->prefix . 'aidf_submissions';

    $sql_teams = "CREATE TABLE {$teams_table} (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(120) NOT NULL,
        access_token VARCHAR(24) NOT NULL,
        captain_user_id BIGINT(20) UNSIGNED NOT NULL,
        score INT(11) NOT NULL DEFAULT 0,
        rank_position INT(11) DEFAULT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        PRIMARY KEY  (id),
        UNIQUE KEY access_token (access_token),
        KEY captain_user_id (captain_user_id),
        KEY score (score)
    ) {$charset_collate};";

    $sql_members = "CREATE TABLE {$members_table} (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        team_id BIGINT(20) UNSIGNED NOT NULL,
        user_id BIGINT(20) UNSIGNED NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'member',
        joined_at DATETIME NOT NULL,
        PRIMARY KEY  (id),
        UNIQUE KEY team_user (team_id, user_id),
        KEY user_id (user_id),
        KEY team_id (team_id)
    ) {$charset_collate};";

    $sql_submissions = "CREATE TABLE {$submissions_table} (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        challenge_id BIGINT(20) UNSIGNED NOT NULL,
        team_id BIGINT(20) UNSIGNED NOT NULL,
        user_id BIGINT(20) UNSIGNED NOT NULL,
        flag_value VARCHAR(255) NOT NULL,
        is_correct TINYINT(1) NOT NULL DEFAULT 0,
        awarded_points INT(11) NOT NULL DEFAULT 0,
        response_message VARCHAR(255) DEFAULT NULL,
        submitted_at DATETIME NOT NULL,
        PRIMARY KEY  (id),
        KEY challenge_id (challenge_id),
        KEY team_id (team_id),
        KEY user_id (user_id),
        KEY is_correct (is_correct),
        KEY submitted_at (submitted_at)
    ) {$charset_collate};";

    dbDelta($sql_teams);
    dbDelta($sql_members);
    dbDelta($sql_submissions);

    update_option('aidefcon_core_db_version', AIDEFCON_CORE_DB_VERSION);

    Aidefcon_Core_Plugin::instance()->register_post_types();
    flush_rewrite_rules();
}

function aidefcon_core_deactivate(): void
{
    flush_rewrite_rules();
}

register_activation_hook(__FILE__, 'aidefcon_core_activate');
register_deactivation_hook(__FILE__, 'aidefcon_core_deactivate');
Aidefcon_Core_Plugin::instance();
