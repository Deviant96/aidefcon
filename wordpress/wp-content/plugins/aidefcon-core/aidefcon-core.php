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
        add_action('admin_init', [$this, 'register_admin_settings']);
        add_action('admin_menu', [$this, 'register_admin_pages']);
        add_action('add_meta_boxes', [$this, 'register_meta_boxes']);
        add_action('save_post_aidf_challenge', [$this, 'save_challenge_meta']);
        add_action('save_post_aidf_announcement', [$this, 'save_announcement_meta']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
        add_action('admin_post_aidefcon_team_action', [$this, 'handle_team_admin_action']);
    }

    public function get_default_settings(): array
    {
        return [
            'submissions_enabled' => 1,
            'scoreboard_frozen' => 0,
            'registration_open' => 1,
            'challenge_access_open' => 1,
            'countdown_date' => '',
        ];
    }

    public function register_admin_settings(): void
    {
        register_setting('aidefcon_settings_group', 'aidefcon_settings', [
            'type' => 'array',
            'sanitize_callback' => [$this, 'sanitize_admin_settings'],
            'default' => $this->get_default_settings(),
        ]);
    }

    public function sanitize_admin_settings($input): array
    {
        $input = is_array($input) ? $input : [];

        return [
            'submissions_enabled' => !empty($input['submissions_enabled']) ? 1 : 0,
            'scoreboard_frozen' => !empty($input['scoreboard_frozen']) ? 1 : 0,
            'registration_open' => !empty($input['registration_open']) ? 1 : 0,
            'challenge_access_open' => !empty($input['challenge_access_open']) ? 1 : 0,
            'countdown_date' => sanitize_text_field((string) ($input['countdown_date'] ?? '')),
        ];
    }

    private function get_admin_settings(): array
    {
        $saved = get_option('aidefcon_settings', []);

        return wp_parse_args(is_array($saved) ? $saved : [], $this->get_default_settings());
    }

    public function register_admin_pages(): void
    {
        add_menu_page(
            'AI Defcon Dashboard',
            'AI Defcon',
            'manage_options',
            'aidefcon-dashboard',
            [$this, 'render_admin_dashboard_page'],
            'dashicons-shield',
            56
        );

        add_submenu_page(
            'aidefcon-dashboard',
            'Competition Settings',
            'Competition Settings',
            'manage_options',
            'aidefcon-settings',
            [$this, 'render_competition_settings_page']
        );

        add_submenu_page(
            'aidefcon-dashboard',
            'Team Management',
            'Team Management',
            'manage_options',
            'aidefcon-teams',
            [$this, 'render_team_management_page']
        );

        add_submenu_page(
            'aidefcon-dashboard',
            'Submission Logs',
            'Submission Logs',
            'manage_options',
            'aidefcon-logs',
            [$this, 'render_submission_logs_page']
        );
    }

    public function render_admin_dashboard_page(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Insufficient permissions.');
        }

        echo '<div class="wrap">';
        echo '<h1>AI Defcon Admin Dashboard</h1>';
        echo '<p>Manage core competition controls, teams, and logs.</p>';
        echo '<ul style="list-style:disc; padding-left:20px;">';
        echo '<li><a href="' . esc_url(admin_url('admin.php?page=aidefcon-settings')) . '">Competition settings</a></li>';
        echo '<li><a href="' . esc_url(admin_url('edit.php?post_type=aidf_challenge')) . '">Challenge CRUD</a></li>';
        echo '<li><a href="' . esc_url(admin_url('edit.php?post_type=aidf_announcement')) . '">Announcement management</a></li>';
        echo '<li><a href="' . esc_url(admin_url('admin.php?page=aidefcon-teams')) . '">Team management</a></li>';
        echo '<li><a href="' . esc_url(admin_url('admin.php?page=aidefcon-logs')) . '">Submission logs and audit history</a></li>';
        echo '</ul>';
        echo '</div>';
    }

    public function render_competition_settings_page(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Insufficient permissions.');
        }

        $settings = $this->get_admin_settings();

        echo '<div class="wrap">';
        echo '<h1>Competition Settings</h1>';
        echo '<form method="post" action="options.php">';
        settings_fields('aidefcon_settings_group');
        echo '<table class="form-table" role="presentation">';
        echo '<tr><th scope="row">Enable submissions</th><td><label><input type="checkbox" name="aidefcon_settings[submissions_enabled]" value="1" ' . checked(1, (int) $settings['submissions_enabled'], false) . '> Allow flag submissions</label></td></tr>';
        echo '<tr><th scope="row">Freeze scoreboard</th><td><label><input type="checkbox" name="aidefcon_settings[scoreboard_frozen]" value="1" ' . checked(1, (int) $settings['scoreboard_frozen'], false) . '> Stop visible scoreboard updates</label></td></tr>';
        echo '<tr><th scope="row">Open registration</th><td><label><input type="checkbox" name="aidefcon_settings[registration_open]" value="1" ' . checked(1, (int) $settings['registration_open'], false) . '> Allow new registrations</label></td></tr>';
        echo '<tr><th scope="row">Open challenge access</th><td><label><input type="checkbox" name="aidefcon_settings[challenge_access_open]" value="1" ' . checked(1, (int) $settings['challenge_access_open'], false) . '> Allow challenge browsing and solve attempts</label></td></tr>';
        echo '<tr><th scope="row">Event countdown date</th><td><input type="datetime-local" name="aidefcon_settings[countdown_date]" value="' . esc_attr((string) $settings['countdown_date']) . '" class="regular-text"></td></tr>';
        echo '</table>';
        submit_button('Save Settings');
        echo '</form>';
        echo '</div>';
    }

    public function register_meta_boxes(): void
    {
        add_meta_box(
            'aidefcon_challenge_meta',
            'Challenge Configuration',
            [$this, 'render_challenge_meta_box'],
            'aidf_challenge',
            'normal',
            'high'
        );

        add_meta_box(
            'aidefcon_announcement_meta',
            'Announcement Configuration',
            [$this, 'render_announcement_meta_box'],
            'aidf_announcement',
            'side',
            'high'
        );
    }

    public function render_challenge_meta_box(WP_Post $post): void
    {
        wp_nonce_field('aidefcon_challenge_meta', 'aidefcon_challenge_meta_nonce');

        $category = (string) get_post_meta($post->ID, 'aidf_category', true);
        $difficulty = (string) get_post_meta($post->ID, 'aidf_difficulty', true);
        $points = (int) get_post_meta($post->ID, 'aidf_points', true);
        $hint = (string) get_post_meta($post->ID, 'aidf_hint', true);
        $file_id = (int) get_post_meta($post->ID, 'aidf_file_id', true);
        $file_url = $file_id > 0 ? wp_get_attachment_url($file_id) : '';

        echo '<p><label>Category<br><input type="text" name="aidf_category" value="' . esc_attr($category) . '" class="widefat" placeholder="Web, Pwn, Crypto, Reverse, Misc"></label></p>';
        echo '<p><label>Difficulty<br><select name="aidf_difficulty" class="widefat">';
        foreach (['easy', 'medium', 'hard'] as $option) {
            echo '<option value="' . esc_attr($option) . '" ' . selected($difficulty, $option, false) . '>' . esc_html(ucfirst($option)) . '</option>';
        }
        echo '</select></label></p>';
        echo '<p><label>Points<br><input type="number" name="aidf_points" value="' . esc_attr((string) $points) . '" class="small-text" min="0" step="1"></label></p>';
        echo '<p><label>Hint<br><textarea name="aidf_hint" rows="3" class="widefat">' . esc_textarea($hint) . '</textarea></label></p>';
        echo '<p><label>Attachment File</label><br>';
        echo '<input type="hidden" name="aidf_file_id" id="aidf_file_id" value="' . esc_attr((string) $file_id) . '">';
        echo '<button type="button" class="button" id="aidf_upload_file_button">Select File</button>';
        echo ' <span id="aidf_file_selected">' . esc_html($file_url ? basename((string) $file_url) : 'No file selected') . '</span>';
        echo '</p>';
    }

    public function render_announcement_meta_box(WP_Post $post): void
    {
        wp_nonce_field('aidefcon_announcement_meta', 'aidefcon_announcement_meta_nonce');

        $pinned = (int) get_post_meta($post->ID, 'aidf_pinned', true);
        $urgent = (int) get_post_meta($post->ID, 'aidf_urgent', true);
        $scheduled_at = (string) get_post_meta($post->ID, 'aidf_scheduled_at', true);

        echo '<p><label><input type="checkbox" name="aidf_pinned" value="1" ' . checked(1, $pinned, false) . '> Pin announcement</label></p>';
        echo '<p><label><input type="checkbox" name="aidf_urgent" value="1" ' . checked(1, $urgent, false) . '> Mark urgent</label></p>';
        echo '<p><label>Schedule At<br><input type="datetime-local" name="aidf_scheduled_at" value="' . esc_attr($scheduled_at) . '" class="widefat"></label></p>';
        echo '<p class="description">WordPress post scheduling remains available via Publish settings.</p>';
    }

    public function enqueue_admin_assets(string $hook): void
    {
        if (!in_array($hook, ['post.php', 'post-new.php'], true)) {
            return;
        }

        $screen = get_current_screen();
        if (!$screen || $screen->post_type !== 'aidf_challenge') {
            return;
        }

        wp_enqueue_media();
        wp_add_inline_script(
            'jquery-core',
            "jQuery(function($){
                var frame;
                $('#aidf_upload_file_button').on('click', function(e){
                    e.preventDefault();
                    if (frame) { frame.open(); return; }
                    frame = wp.media({ title: 'Select challenge file', button: { text: 'Use file' }, multiple: false });
                    frame.on('select', function(){
                        var attachment = frame.state().get('selection').first().toJSON();
                        $('#aidf_file_id').val(attachment.id);
                        $('#aidf_file_selected').text(attachment.filename || 'Selected file');
                    });
                    frame.open();
                });
            });"
        );
    }

    public function save_challenge_meta(int $post_id): void
    {
        if (!$this->can_save_post_meta($post_id, 'aidefcon_challenge_meta_nonce', 'aidefcon_challenge_meta')) {
            return;
        }

        update_post_meta($post_id, 'aidf_category', sanitize_text_field((string) ($_POST['aidf_category'] ?? '')));
        update_post_meta($post_id, 'aidf_difficulty', sanitize_text_field((string) ($_POST['aidf_difficulty'] ?? 'easy')));
        update_post_meta($post_id, 'aidf_points', max(0, (int) ($_POST['aidf_points'] ?? 0)));
        update_post_meta($post_id, 'aidf_hint', sanitize_textarea_field((string) ($_POST['aidf_hint'] ?? '')));
        update_post_meta($post_id, 'aidf_file_id', max(0, (int) ($_POST['aidf_file_id'] ?? 0)));
    }

    public function save_announcement_meta(int $post_id): void
    {
        if (!$this->can_save_post_meta($post_id, 'aidefcon_announcement_meta_nonce', 'aidefcon_announcement_meta')) {
            return;
        }

        update_post_meta($post_id, 'aidf_pinned', !empty($_POST['aidf_pinned']) ? 1 : 0);
        update_post_meta($post_id, 'aidf_urgent', !empty($_POST['aidf_urgent']) ? 1 : 0);
        update_post_meta($post_id, 'aidf_scheduled_at', sanitize_text_field((string) ($_POST['aidf_scheduled_at'] ?? '')));
    }

    private function can_save_post_meta(int $post_id, string $nonce_key, string $nonce_action): bool
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return false;
        }

        if (!isset($_POST[$nonce_key])) {
            return false;
        }

        if (!wp_verify_nonce((string) $_POST[$nonce_key], $nonce_action)) {
            return false;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return false;
        }

        return true;
    }

    public function render_team_management_page(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Insufficient permissions.');
        }

        global $wpdb;

        $teams_table = $wpdb->prefix . 'aidf_teams';
        $members_table = $wpdb->prefix . 'aidf_members';
        $teams = $wpdb->get_results(
            "SELECT t.*, COUNT(m.id) AS member_count
             FROM {$teams_table} t
             LEFT JOIN {$members_table} m ON m.team_id = t.id
             GROUP BY t.id
             ORDER BY t.score DESC, t.id ASC"
        );

        $selected_team_id = isset($_GET['team_id']) ? (int) $_GET['team_id'] : 0;
        $members = [];
        if ($selected_team_id > 0) {
            $members = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT * FROM {$members_table} WHERE team_id = %d ORDER BY joined_at ASC",
                    $selected_team_id
                )
            );
        }

        echo '<div class="wrap">';
        echo '<h1>Team Management</h1>';

        if (!empty($_GET['message'])) {
            echo '<div class="notice notice-success"><p>' . esc_html(sanitize_text_field((string) $_GET['message'])) . '</p></div>';
        }

        echo '<table class="widefat striped"><thead><tr><th>ID</th><th>Name</th><th>Token</th><th>Members</th><th>Score</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
        if (!empty($teams)) {
            foreach ($teams as $team) {
                $ban_op = ((string) $team->status === 'banned') ? 'unban' : 'ban';
                $ban_label = $ban_op === 'ban' ? 'Ban' : 'Unban';
                $ban_url = wp_nonce_url(
                    admin_url('admin-post.php?action=aidefcon_team_action&operation=' . $ban_op . '&team_id=' . (int) $team->id),
                    'aidefcon_team_action'
                );
                $regen_url = wp_nonce_url(
                    admin_url('admin-post.php?action=aidefcon_team_action&operation=regenerate_token&team_id=' . (int) $team->id),
                    'aidefcon_team_action'
                );
                $view_members_url = admin_url('admin.php?page=aidefcon-teams&team_id=' . (int) $team->id);

                echo '<tr>';
                echo '<td>' . (int) $team->id . '</td>';
                echo '<td>' . esc_html((string) $team->name) . '</td>';
                echo '<td><code>' . esc_html((string) $team->access_token) . '</code></td>';
                echo '<td>' . (int) $team->member_count . '</td>';
                echo '<td>' . (int) $team->score . '</td>';
                echo '<td>' . esc_html((string) $team->status) . '</td>';
                echo '<td><a href="' . esc_url($ban_url) . '">' . esc_html($ban_label) . '</a> | <a href="' . esc_url($regen_url) . '">Regenerate Token</a> | <a href="' . esc_url($view_members_url) . '">Members</a></td>';
                echo '</tr>';
            }
        } else {
            echo '<tr><td colspan="7">No teams found yet.</td></tr>';
        }
        echo '</tbody></table>';

        if ($selected_team_id > 0) {
            echo '<h2 style="margin-top:24px;">Members for Team #' . (int) $selected_team_id . '</h2>';
            echo '<table class="widefat striped"><thead><tr><th>User ID</th><th>Role</th><th>Joined</th><th>Action</th></tr></thead><tbody>';
            if (!empty($members)) {
                foreach ($members as $member) {
                    $remove_url = wp_nonce_url(
                        admin_url('admin-post.php?action=aidefcon_team_action&operation=remove_member&team_id=' . (int) $member->team_id . '&user_id=' . (int) $member->user_id),
                        'aidefcon_team_action'
                    );
                    echo '<tr>';
                    echo '<td>' . (int) $member->user_id . '</td>';
                    echo '<td>' . esc_html((string) $member->role) . '</td>';
                    echo '<td>' . esc_html((string) $member->joined_at) . '</td>';
                    echo '<td><a href="' . esc_url($remove_url) . '">Remove</a></td>';
                    echo '</tr>';
                }
            } else {
                echo '<tr><td colspan="4">No members found for this team.</td></tr>';
            }
            echo '</tbody></table>';
        }

        echo '</div>';
    }

    public function handle_team_admin_action(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Insufficient permissions.');
        }

        check_admin_referer('aidefcon_team_action');

        global $wpdb;

        $operation = sanitize_text_field((string) ($_GET['operation'] ?? ''));
        $team_id = (int) ($_GET['team_id'] ?? 0);
        $user_id = (int) ($_GET['user_id'] ?? 0);

        $teams_table = $wpdb->prefix . 'aidf_teams';
        $members_table = $wpdb->prefix . 'aidf_members';
        $message = 'No changes applied.';

        if ($team_id > 0 && in_array($operation, ['ban', 'unban', 'regenerate_token'], true)) {
            if ($operation === 'ban') {
                $wpdb->update($teams_table, ['status' => 'banned', 'updated_at' => current_time('mysql')], ['id' => $team_id], ['%s', '%s'], ['%d']);
                $this->log_audit('team_banned', $team_id, get_current_user_id(), 'Team banned by admin');
                $message = 'Team banned.';
            } elseif ($operation === 'unban') {
                $wpdb->update($teams_table, ['status' => 'active', 'updated_at' => current_time('mysql')], ['id' => $team_id], ['%s', '%s'], ['%d']);
                $this->log_audit('team_unbanned', $team_id, get_current_user_id(), 'Team unbanned by admin');
                $message = 'Team unbanned.';
            } else {
                $token = $this->generate_team_token();
                $wpdb->update($teams_table, ['access_token' => $token, 'updated_at' => current_time('mysql')], ['id' => $team_id], ['%s', '%s'], ['%d']);
                $this->log_audit('team_token_regenerated', $team_id, get_current_user_id(), 'Team token regenerated by admin');
                $message = 'Team token regenerated.';
            }
        }

        if ($team_id > 0 && $user_id > 0 && $operation === 'remove_member') {
            $wpdb->delete($members_table, ['team_id' => $team_id, 'user_id' => $user_id], ['%d', '%d']);
            $this->log_audit('team_member_removed', $team_id, get_current_user_id(), 'Removed user #' . $user_id . ' from team');
            $message = 'Team member removed.';
        }

        wp_safe_redirect(admin_url('admin.php?page=aidefcon-teams&team_id=' . $team_id . '&message=' . rawurlencode($message)));
        exit;
    }

    private function generate_team_token(): string
    {
        $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        $parts = [];

        for ($i = 0; $i < 2; $i++) {
            $chunk = '';
            for ($j = 0; $j < 4; $j++) {
                $index = random_int(0, strlen($alphabet) - 1);
                $chunk .= $alphabet[$index];
            }
            $parts[] = $chunk;
        }

        return 'AIDF-' . implode('-', $parts);
    }

    public function render_submission_logs_page(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Insufficient permissions.');
        }

        global $wpdb;

        $submissions_table = $wpdb->prefix . 'aidf_submissions';
        $audit_table = $wpdb->prefix . 'aidf_audit_logs';

        $submissions = $wpdb->get_results(
            "SELECT * FROM {$submissions_table} ORDER BY submitted_at DESC, id DESC LIMIT 100"
        );

        $audits = $wpdb->get_results(
            "SELECT * FROM {$audit_table} ORDER BY created_at DESC, id DESC LIMIT 100"
        );

        echo '<div class="wrap">';
        echo '<h1>Submission Logs & Audit History</h1>';

        echo '<h2>Latest Submissions</h2>';
        echo '<table class="widefat striped"><thead><tr><th>ID</th><th>Challenge</th><th>Team</th><th>User</th><th>Correct</th><th>Points</th><th>Submitted At</th></tr></thead><tbody>';
        if (!empty($submissions)) {
            foreach ($submissions as $row) {
                echo '<tr>';
                echo '<td>' . (int) $row->id . '</td>';
                echo '<td>' . (int) $row->challenge_id . '</td>';
                echo '<td>' . (int) $row->team_id . '</td>';
                echo '<td>' . (int) $row->user_id . '</td>';
                echo '<td>' . ((int) $row->is_correct ? 'yes' : 'no') . '</td>';
                echo '<td>' . (int) $row->awarded_points . '</td>';
                echo '<td>' . esc_html((string) $row->submitted_at) . '</td>';
                echo '</tr>';
            }
        } else {
            echo '<tr><td colspan="7">No submissions yet.</td></tr>';
        }
        echo '</tbody></table>';

        echo '<h2 style="margin-top:24px;">Audit History</h2>';
        echo '<table class="widefat striped"><thead><tr><th>ID</th><th>Action</th><th>Team ID</th><th>Actor User ID</th><th>Message</th><th>Created At</th></tr></thead><tbody>';
        if (!empty($audits)) {
            foreach ($audits as $row) {
                echo '<tr>';
                echo '<td>' . (int) $row->id . '</td>';
                echo '<td>' . esc_html((string) $row->action_key) . '</td>';
                echo '<td>' . (int) $row->team_id . '</td>';
                echo '<td>' . (int) $row->actor_user_id . '</td>';
                echo '<td>' . esc_html((string) $row->message) . '</td>';
                echo '<td>' . esc_html((string) $row->created_at) . '</td>';
                echo '</tr>';
            }
        } else {
            echo '<tr><td colspan="6">No audit logs yet.</td></tr>';
        }
        echo '</tbody></table>';
        echo '</div>';
    }

    private function log_audit(string $action_key, int $team_id, int $actor_user_id, string $message): void
    {
        global $wpdb;

        $audit_table = $wpdb->prefix . 'aidf_audit_logs';
        $wpdb->insert(
            $audit_table,
            [
                'action_key' => $action_key,
                'team_id' => $team_id,
                'actor_user_id' => $actor_user_id,
                'message' => $message,
                'created_at' => current_time('mysql'),
            ],
            ['%s', '%d', '%d', '%s', '%s']
        );
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
    $audit_table = $wpdb->prefix . 'aidf_audit_logs';

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

    $sql_audit = "CREATE TABLE {$audit_table} (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        action_key VARCHAR(100) NOT NULL,
        team_id BIGINT(20) UNSIGNED NOT NULL DEFAULT 0,
        actor_user_id BIGINT(20) UNSIGNED NOT NULL DEFAULT 0,
        message VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL,
        PRIMARY KEY  (id),
        KEY action_key (action_key),
        KEY team_id (team_id),
        KEY actor_user_id (actor_user_id),
        KEY created_at (created_at)
    ) {$charset_collate};";

    dbDelta($sql_teams);
    dbDelta($sql_members);
    dbDelta($sql_submissions);
    dbDelta($sql_audit);

    update_option('aidefcon_core_db_version', AIDEFCON_CORE_DB_VERSION);
    add_option('aidefcon_settings', Aidefcon_Core_Plugin::instance()->get_default_settings());

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
