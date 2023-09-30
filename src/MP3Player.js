const defaultCoverImg = 'https://i.ibb.co/1qDChXj/cassette-tape-square.jpg';

const MP3Player = (selector, songs = []) => {
	const element = typeof selector == 'string' ? document.querySelector(selector) : selector;

	const cover = element.querySelector('#cover');
	const disc = element.querySelector('#disc');
	const title = element.querySelector('#title');
	const artist = element.querySelector('#artist');
	const progressContainer = element.querySelector('#progressContainer');
	const progress = element.querySelector('#progress');
	const timer = element.querySelector('#timer');
	const duration = element.querySelector('#duration');
	const prev = element.querySelector('#prev');
	const play = element.querySelector('#play');
	const next = element.querySelector('#next');
	let songIndex = 0;

	// Load the given song
	const loadSong = (song) => {
		cover.src = song.cover?.url || defaultCoverImg;
		disc.src = song.audio?.url;
		title.textContent = song.title;
		artist.textContent = song.artist;
		// duration.textContent = song.duration;
		disc.addEventListener('loadedmetadata', function () {
			duration.innerHTML = toHHMMSS(disc.duration);
		});
	};
	loadSong(songs[songIndex]);

	// Toggle play and pause
	function playPauseMedia() {
		if (disc.paused) {
			const allAudioEls = document.querySelectorAll('audio');
			allAudioEls.forEach(audioEl => audioEl?.pause());

			disc.play();
		} else {
			disc.pause();
		}
	}

	// Convert time
	function toHHMMSS(time) {
		var sec_num = parseInt(time, 10); // don't forget the second param
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - hours * 3600) / 60);
		var seconds = sec_num - hours * 3600 - minutes * 60;

		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
		}

		return `${parseInt(hours) > 0 ? `${hours}:` : ''}${minutes}:${seconds}`;
	}

	// Update icon
	function updatePlayPauseIcon() {
		if (disc.paused) {
			play.classList.remove('pauseBtn');
			play.classList.add('playBtn');
		} else {
			play.classList.remove('playBtn');
			play.classList.add('pauseBtn');
		}
	}

	// Update progress bar
	function updateProgress() {
		progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

		var hours = Math.floor(disc.currentTime / 3600);
		var minutes = Math.floor((disc.currentTime - hours * 3600) / 60);
		var seconds = Math.floor(disc.currentTime - hours * 3600 - minutes * 60);
		// let minutes = Math.floor(disc.currentTime / 60);
		// let seconds = Math.floor(disc.currentTime % 60);
		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		timer.textContent = `${parseInt(hours) > 0 ? `${hours}:` : ''}${minutes}:${seconds}`;
	}

	// Reset the progress
	function resetProgress() {
		progress.style.width = 0 + '%';
		timer.textContent = '0:00';
	}

	// Go to previous song
	function gotoPreviousSong() {
		if (songIndex === 0) {
			songIndex = songs.length - 1;
		} else {
			songIndex = songIndex - 1;
		}

		const isDiscPlayingNow = !disc.paused;
		loadSong(songs[songIndex]);
		resetProgress();
		if (isDiscPlayingNow) {
			playPauseMedia();
		}
	}

	// Go to next song
	function gotoNextSong(playImmediately) {
		const goToNext = () => {
			if (songIndex === songs.length - 1) {
				songIndex = 0;
			} else {
				songIndex = songIndex + 1;
			}

			const isDiscPlayingNow = !disc.paused;
			loadSong(songs[songIndex]);
			resetProgress();
			if (isDiscPlayingNow || playImmediately) {
				playPauseMedia();
			}
		}

		if (songIndex < songs.length - 1) {
			goToNext()
		} // Stop at end of album
	}

	// Change song progress when clicked on progress bar
	function setProgress(ev) {
		const totalWidth = this.clientWidth;
		const clickWidth = ev.offsetX;
		const clickWidthRatio = clickWidth / totalWidth;
		disc.currentTime = clickWidthRatio * disc.duration;
	}

	// Play/Pause when play button clicked
	play.addEventListener('click', playPauseMedia);

	// Various events on disc
	disc.addEventListener('play', updatePlayPauseIcon);
	disc.addEventListener('pause', updatePlayPauseIcon);
	disc.addEventListener('timeupdate', updateProgress);
	disc.addEventListener('ended', gotoNextSong.bind(null, true));

	// Go to next song when next button clicked
	prev.addEventListener('click', gotoPreviousSong);

	// Go to previous song when previous button clicked
	next.addEventListener('click', gotoNextSong.bind(null, false));

	// Move to different place in the song
	progressContainer.addEventListener('click', setProgress);
};
export default MP3Player;