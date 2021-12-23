const MP3Player = (selector, songs = []) => {
  const element =
    typeof selector == "string" ? document.querySelector(selector) : selector;

  // console.log(songs);

  const cover = element.querySelector("#cover");
  const disc = element.querySelector("#disc");
  const title = element.querySelector("#title");
  const artist = element.querySelector("#artist");
  const progressContainer = element.querySelector("#progress-container");
  const progress = element.querySelector("#progress");
  const timer = element.querySelector("#timer");
  const duration = element.querySelector("#duration");
  const prev = element.querySelector("#prev");
  const play = element.querySelector("#play");
  const next = element.querySelector("#next");
  let songIndex = 0;

  // Songs info
  // const songs = [
  //   {
  //     title: 'Green Chair',
  //     artist: 'Diego Nava',
  //     coverPath: 'assets/images/cover1.jpg',
  //     discPath: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
  //     duration: '1:33',
  //   },
  //   {
  //     title: 'Dance with Me',
  //     artist: 'Ahjay Stelino',
  //     coverPath: 'assets/images/cover2.jpg',
  //     discPath: 'assets/music/music2.mp3',
  //     duration: '2:22',
  //   },
  //   {
  //     title: 'Gimme that Bottle',
  //     artist: 'Michael Ramir',
  //     coverPath: 'assets/images/cover3.jpg',
  //     discPath: 'assets/music/music3.mp3',
  //     duration: '1:54',
  //   },
  // ];

  // Load song initially

  // Load the given song
  const loadSong = (song) => {
    cover.src = song.cover?.url;
    disc.src = song.audio?.url;
    title.textContent = song.title;
    artist.textContent = song.artist;
    // duration.textContent = song.duration;
    disc.addEventListener("loadedmetadata", function () {
      duration.innerHTML = toHHMMSS(disc.duration);
    });
  };

  loadSong(songs[songIndex]);

  // Toggle play and pause
  function playPauseMedia() {
    if (disc.paused) {
      disc.play();
    } else {
      disc.pause();
    }
  }

  function toHHMMSS(time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }

  // Update icon
  function updatePlayPauseIcon() {
    if (disc.paused) {
      play.classList.remove("pauseBtn");
      play.classList.add("playBtn");
    } else {
      play.classList.remove("playBtn");
      play.classList.add("pauseBtn");
    }
  }

  // Update progress bar
  function updateProgress() {
    progress.style.width = (disc.currentTime / disc.duration) * 100 + "%";

    let minutes = Math.floor(disc.currentTime / 60);
    let seconds = Math.floor(disc.currentTime % 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    timer.textContent = `${minutes}:${seconds}`;
  }

  // Reset the progress
  function resetProgress() {
    progress.style.width = 0 + "%";
    timer.textContent = "0:00";
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

  // Change song progress when clicked on progress bar
  function setProgress(ev) {
    const totalWidth = this.clientWidth;
    const clickWidth = ev.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
  }

  // Play/Pause when play button clicked
  play.addEventListener("click", playPauseMedia);

  // Various events on disc
  disc.addEventListener("play", updatePlayPauseIcon);
  disc.addEventListener("pause", updatePlayPauseIcon);
  disc.addEventListener("timeupdate", updateProgress);
  disc.addEventListener("ended", gotoNextSong.bind(null, true));

  // Go to next song when next button clicked
  prev.addEventListener("click", gotoPreviousSong);

  // Go to previous song when previous button clicked
  next.addEventListener("click", gotoNextSong.bind(null, false));

  // Move to different place in the song
  progressContainer.addEventListener("click", setProgress);
};

export default MP3Player;
// export MP3Player
