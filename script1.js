// import { songs } from "./data.js";

let currentMusic = 0;

let music = document.querySelector('#audio');
let seekBar = document.getElementById("scroll");
let songName = document.querySelector(".music-name");
let artistName = document.querySelector(".artist-name");
let disk = document.querySelector(".disk");
let currentTime = document.querySelector(".current-time");
let musicDuration = document.querySelector(".song-duration");
let playBtn = document.querySelector(".play-btn");
let forwardBtn = document.getElementById("forward");
let backBtn = document.getElementById("back");
let playlistContainer = document.querySelector(".playlist");
const barsIcon = document.querySelector(".fa-bars");
// console.log(songs);

playBtn.addEventListener('click', () => {
  playBtn.classList.toggle('pause');
  disk.classList.toggle('play');

  if (playBtn.classList.contains('pause')) {
    music.pause();
  } else {
    music.play();
  }
});

function setMusic(i) {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  disk.style.backgroundImage = `url('${song.cover}')`;
  currentTime.innerHTML = '00:00';

  // setTimeout(() => {
  //   seekBar.max = parseFloat(music.duration);
  //   musicDuration.innerHTML = formatTime(music.duration);
  // });
}

// function formatTime(time) {
//   let minutes = Math.floor(time / 60);
//   let seconds = Math.floor(time % 60);
//   return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// }

forwardBtn.addEventListener('click', () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playBtn.click();
});

backBtn.addEventListener('click', () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playBtn.click();
});

setMusic(0);

let isPlaylistVisible = false;

function togglePlaylist() {
  isPlaylistVisible = !isPlaylistVisible;
  playlistContainer.classList.toggle("show", isPlaylistVisible);
}

// Event listener for bars icon click
barsIcon.addEventListener("click", () => {
  if (!isPlaylistVisible) {
    generatePlaylist();
  }
  togglePlaylist();
});

function generatePlaylist() {
  const playlistItems = songs.map((song, index) => {
    const listItem = document.createElement("div");
    listItem.classList.add("playlist-item");
    listItem.textContent = `${index + 1}. ${song.name}`;

    listItem.addEventListener("click", () => {
      setMusic(index);
      playBtn.click();
    });

    return listItem;
  });

  playlistContainer.innerHTML = "";
  playlistContainer.append(...playlistItems);
}
