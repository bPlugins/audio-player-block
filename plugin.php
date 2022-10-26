<?php
/**
 * Plugin Name: Audio Player Block
 * Description: Listen Music on the Web.
 * Version: 1.0.2
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: mp3player-block
 */


// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'BPMP_PLUGIN_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : ' 1.0.2' );
define( 'BPMP_PLUGIN_DIR', plugin_dir_url( __FILE__ ) );

// Block Directory
class BPMPBlockDirectory{
	function __construct(){
		add_action( 'init', [$this, 'register'] );
	}

	function register() {
		wp_register_style( 'bpmp-mp3-player-editor-style', plugins_url( 'dist/editor.css', __FILE__ ), [ 'wp-edit-blocks' ], BPMP_PLUGIN_VERSION ); // Backend Style
		wp_register_style( 'bpmp-mp3-player-style', plugins_url( 'dist/style.css', __FILE__ ), [], BPMP_PLUGIN_VERSION ); // Frontend Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'bpmp-mp3-player-editor-style',
			'style'				=> 'bpmp-mp3-player-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'bpmp-mp3-player-editor-script', 'mp3player-block', plugin_dir_path( __FILE__ ) . 'languages' ); // Translate
	}

	function render( $attributes ){
		extract( $attributes );

		$className = $className ?? '';
		$bpmpBlockClassName = 'wp-block-bpmp-mp3-player ' . $className . ' align' . $align;

		ob_start(); ?>
		<div class='<?php echo esc_attr( $bpmpBlockClassName ); ?>' id='bmpb_player-<?php echo esc_attr( $cId ); ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'>
			<style>
				<?php echo '#bmpb_player-'.esc_attr( $cId ); ?> {
					text-align: <?php echo esc_attr( $alignment ); ?>;
				}
				<?php echo '#bmpb_player-'.esc_attr( $cId ); ?> .music-container {
					width: <?php echo esc_attr( $width ); ?>;
				}
			</style>

			<div class='music-container'>
				<div id='cover-box'>
					<img id='cover' />
				</div>

				<div id='music-box'>
					<audio id='disc'></audio>
		
					<div id='music-info'>
						<h2 id='title'></h2>
						<h3 id='artist'></h3>

						<div id='progress-container'>
							<div id='progress'></div>
						</div>

						<div id='timer-bar'>
							<span id='timer'>0:00</span>
							<span id='duration'></span>
						</div>
					</div>

					<div id='control-box'>
						<span class='btnPrev'>
							<svg xmlns='http://www.w3.org/2000/svg' class='btn' id='prev' viewBox='0 0 512 512'>
								<path d='M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z' />
							</svg>
						</span>
						<span class='special-btn'>
							<svg xmlns='http://www.w3.org/2000/svg' class='playBtn' id='play' viewBox='0 0 448 512'>
								<path class='playPath' d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z' />
								<path class='pausePath' d='M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z'
							/>
							</svg>
						</span>
						<span class='btnNext'>
							<svg xmlns='http://www.w3.org/2000/svg' class='btn' id='next' viewBox='0 0 512 512'>
								<path d='M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z' />
							</svg>
						</span>
					</div>
				</div>
			</div>
		</div>

		<?php return ob_get_clean();
	} // Render
}
new BPMPBlockDirectory();