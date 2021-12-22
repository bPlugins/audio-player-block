<?php
/**
 * Plugin Name: MP3 Player - Gutenberg Block
 * Description: Listen Music on Web.
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: mp3player-block
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'BPMP_PLUGIN_DIR', plugin_dir_url( __FILE__ ));
define( 'BPMP_VERSION', 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );

// Block Directory
class BPMPBlockDirectory{
    protected static $_instance = null;

    function __construct(){
        add_action( 'enqueue_block_assets', [$this, 'enqueueBlockAssets'] );
        add_action( 'init', [$this, 'register'] );
    }

    public static function instance(){
        if( self::$_instance === null ){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function enqueueBlockAssets(){ 
        // wp_enqueue_script( 'bpmp-player-script', BPMP_PLUGIN_DIR . 'assets/js/script.js', [], BPMP_VERSION, true ); 
        // wp_enqueue_style( 'bpmp-player-css', BPMP_PLUGIN_DIR . 'assets/css/style.css', [], BPMP_VERSION); 
        // wp_enqueue_style( 'bpmp-fontawesome-css', 'https://use.fontawesome.com/releases/v5.15.1/css/all.css', [], BPMP_VERSION); 
        wp_enqueue_style( 'bpmp-player-css', BPMP_PLUGIN_DIR . 'assets/css/fontAwesome.min.css', [], BPMP_VERSION); 
        // wp_enqueue_style( 'bpmp-font-css', 'https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins:wght@300;400;500;600;700;800;900&display=swap', [], BPMP_VERSION);
    }

    function register() {
        wp_register_script( 'bpmp_editor_script', plugins_url( 'dist/editor.js', __FILE__ ), [ 'wp-blob', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-compose', 'wp-data', 'wp-element', 'wp-html-entities', 'wp-i18n', 'wp-rich-text' ], BPMP_VERSION, false ); // Backend Script
        wp_register_style( 'bpmp_editor_style', plugins_url( 'dist/editor.css', __FILE__ ), [ 'wp-edit-blocks' ], BPMP_VERSION ); // Backend Style
        wp_register_script( 'bpmp_script', plugins_url( 'dist/script.js', __FILE__ ), [ 'jquery' ], BPMP_VERSION, true ); // Frontend Script
        wp_register_style( 'bpmp_style', plugins_url( 'dist/style.css', __FILE__ ), [ 'wp-editor' ], BPMP_VERSION ); // Both Style

        register_block_type( 'bpmp/mp3-player', [
            'editor_script' => 'bpmp_editor_script',
            'editor_style'  => 'bpmp_editor_style',
            'script'        => 'bpmp_script',
            'style'         => 'bpmp_style',
            'render_callback' => [$this, 'render']
        ] ); // Register Block

        wp_set_script_translations( 'bpmp_editor_script', 'mp3player-block', plugin_dir_path( __FILE__ ) . 'languages' ); // Translate
    }

    function render( $attributes ){
        extract( $attributes );


        ob_start(); ?>
        <div class='wp-block-bpmp-mp3-player-block <?php echo 'align' . esc_attr( $align ); ?>'data-timeline="<?php echo esc_attr(wp_json_encode($attributes)); ?>">

        <h2>Frontend</h2>

        </div>

        <?php  return ob_get_clean();
    } // Render
}
BPMPBlockDirectory::instance();