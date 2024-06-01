import { elements } from "./js/helpers.js";
import { API } from "./js/api.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API();

window.onload = async () => await api.topPopular();

elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  if (!query) {
    alert("Lütfen bir müzik ismi giriniz");
    return;
  }
  updateTitle(`${query}  İçin Sonuçlar`);
  api.searchMusic(query);
});

const playMusic = (url) => {
  elements.audioSource.src = url;
  elements.audio.load();
  elements.audio.play();
};

const handleClick = async (e) => {
  console.log("tıklanıldı");
  if (e.target.id == "play-btn") {
    const parent = e.target.closest(".card");
    renderPlayingInfo(parent.dataset);
    playMusic(parent.dataset.url);
  }
};

document.addEventListener("click", handleClick);

const animatePhoto = () => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};

const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);
