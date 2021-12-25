import "./style.scss";
import MP3Player from "../assets/js/script";

addEventListener("DOMContentLoaded", function () {
  let bmpbSelectors = document.querySelectorAll(".wp-block-bpmp-mp3-player");
  Object.values(bmpbSelectors).map((bmpbSelector) => {
    let mp3playerEl = document.getElementById(bmpbSelector.id);

    const { audioProperties } = JSON.parse(mp3playerEl.dataset.mp3player);

    MP3Player("#" + bmpbSelector.id, audioProperties);
  });
});
