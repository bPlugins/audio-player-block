import './style.scss';
import MP3Player from './MP3Player';

// Audio Player
document.addEventListener('DOMContentLoaded', () => {
	const allAudioPlayer = document.querySelectorAll('.wp-block-bpmp-mp3-player');
	allAudioPlayer.forEach(audioPlayer => {
		const attributes = JSON.parse(audioPlayer.dataset.attributes);
		const { audioProperties } = attributes;

		MP3Player(audioPlayer, audioProperties);

		audioPlayer?.removeAttribute('data-attributes');
	});
});