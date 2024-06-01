import { renderSearchMusic, renderSongs } from "./ui.js";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5ffbf60e59mshe2da6f61db1bbf6p142ba1jsne235f98412e0",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};

const optionsTop = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5ffbf60e59mshe2da6f61db1bbf6p142ba1jsne235f98412e0",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

export class API {
  constructor() {
    this.songs = [];
  }
  async searchMusic(query) {
    try {
      const res = await fetch(
        `https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US&offset=0&limit=5`,
        options
      );
      const data = await res.json();
      let newData = data.tracks.hits;
      newData = newData.map((song) => ({ ...song.track }));
      this.songs = newData;

      renderSearchMusic(this.songs);
    } catch (error) {}
  }

  async topPopular() {
    const url =
      "https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry";
    try {
      const response = await fetch(url, optionsTop);
      const result = await response.json();
      this.songs = result.tracks;
      renderSongs(this.songs);
    } catch (error) {
      console.log(error);
    }
  }
}
