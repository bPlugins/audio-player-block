import './style.scss';
import MP3Player from './Components/Common/MP3Player';

document.addEventListener('DOMContentLoaded', () => {
	const mp3PlayerEls = document.querySelectorAll('.wp-block-bpmp-mp3-player');
	mp3PlayerEls.forEach(mp3PlayerEl => {
		const attributes = JSON.parse(mp3PlayerEl.dataset.attributes);
		const { audioProperties } = attributes;

		MP3Player(mp3PlayerEl, audioProperties);

		mp3PlayerEl?.removeAttribute('data-attributes');
	});
});