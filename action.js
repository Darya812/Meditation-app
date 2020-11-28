const song = document.querySelector(".song");
const video = document.querySelector(".vid-container video");
const play = document.querySelector(".play");
const sounds = document.querySelectorAll(".sound-picker button");
const timeDisplay = document.querySelector(".time-display");
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

const checkPlaying = (song) => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./img/pause.png";
  } else {
    song.pause();
    video.pause();
    play.src = "./img/play.png";
  }
};

const restarSong = (song) => {
  let currentTime = song.currentTime;
  song.currentTime = 0;
};

timeDisplay.texContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  fakeDuration % 60
)}`;

sounds.forEach((sound) => {
  sound.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

play.addEventListener("click", function () {
  checkPlaying(song);
});

timeSelect.forEach((option) => {
  option.addEventListener("click", function () {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
  });
});

song.ontimeupdate = function () {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);

  if (seconds < 10) {
    timeDisplay.textContent = `${minutes}:${0}${seconds}`;
  } else {
    timeDisplay.textContent = `${minutes}:${seconds}`;
  }
  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./img/play.png";
    video.pause();
  }
};
