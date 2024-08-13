<?php
$id = wp_unique_id( 'bpMp3Player-' );

extract( $attributes );

$styles = "#$id { text-align: $alignment; } #$id .bpMp3Player { width: $width; }";
?>
<div <?php echo get_block_wrapper_attributes( [ 'class' => "$basicClass" ] ); ?> id='<?php echo esc_attr( $id ); ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'>
	<style><?php echo esc_html( $styles ); ?></style>

	<div class='bpMp3Player'>
		<div class='coverBox'>
			<img id='cover' />
		</div>

		<div class='contentBox'>
			<audio id='disc'></audio>

			<div class='info'>
				<h2 id='title'></h2>
				<h3 id='artist'></h3>

				<div id='progressContainer'>
					<div id='progress'></div>
				</div>

				<div class='timeBar'>
					<span id='timer'>0:00</span>
					<span id='duration'></span>
				</div>
			</div>

			<div class='controls'>
				<span class='prevBtn'>
					<svg xmlns='http://www.w3.org/2000/svg' class='navBtn' id='prev' viewBox='0 0 512 512'>
						<path d='M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z' />
					</svg>
				</span>

				<span class='playPauseBtn'>
					<svg xmlns='http://www.w3.org/2000/svg' class='playBtn' id='play' viewBox='0 0 448 512'>
						<path class='playPath' d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z' />
						<path class='pausePath' d='M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z'
					/>
					</svg>
				</span>

				<span class='nextBtn'>
					<svg xmlns='http://www.w3.org/2000/svg' class='navBtn' id='next' viewBox='0 0 512 512'>
						<path d='M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z' />
					</svg>
				</span>
			</div>
		</div>
	</div>
</div>