
const featuredTrack = {
  title: "I Appear Missing",
  artist: "Queens of the Stone Age",
  cover: "assets/featured-album.jpg",
  url: "https://open.spotify.com/"
};

const title = document.getElementById("track-title");
const artist = document.getElementById("track-artist");
const cover = document.getElementById("track-cover");
const status = document.getElementById("music-status");
const dot = document.getElementById("music-status-dot");

function renderTrack(track, playing) {
  title.textContent = track.title;
  title.href = track.url;
  artist.textContent = track.artist;
  cover.src = track.cover;
  cover.alt = `${track.title} album cover`;

  status.textContent = playing
    ? "currently listening on Spotify"
    : "not playing right now";

  dot.classList.toggle("playing", playing);
}

async function updateNowPlaying() {
  try {
    const response = await fetch("/api/now-playing");

    if (!response.ok) {
      throw new Error("Spotify request failed");
    }

    const data = await response.json();

    if (data.isPlaying && data.track) {
      renderTrack(data.track, true);
    } else {
      renderTrack(featuredTrack, false);
    }
  } catch (error) {
    console.error("Now Playing:", error);
    renderTrack(featuredTrack, false);
  }
}

renderTrack(featuredTrack, false);
updateNowPlaying();

setInterval(updateNowPlaying, 60000);
