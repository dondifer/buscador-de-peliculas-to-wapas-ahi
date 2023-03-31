import { BASE_URL } from "./environment_variables.js";
const callSearchFilm = () => {
  const filmName = document.getElementById("filmName").value;
  getFilms(filmName);
};
const cardSection = document.getElementById("cardSection");
document.getElementById("search").addEventListener("click", callSearchFilm);
let res;
let conf;
let imgBaseUrl;
let imgSizes;

const getFilms = async (name) => {
  try {
    conf = await axios.get(`${BASE_URL.ROOT}/configuration${BASE_URL.API_KEY}`);
    res = await axios.get(
      `${BASE_URL.ROOT}/search/movie${BASE_URL.API_KEY}&query=${name}`
    );
    imgBaseUrl = conf.data.images.base_url;
    imgSizes = conf.data.images.backdrop_sizes;
    paintFilms(res.data.results);
    console.log(res);
    console.log(conf);
    console.log(imgBaseUrl);
    console.log(imgSizes);
  } catch (e) {
    console.log(e);
  }
};

const paintFilms = (films) => {
  cardSection.innerHTML = ``;
  films.forEach((film) => {
    if (film.backdrop_path) {
      cardSection.innerHTML += `<div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
  <div class="card-header">Film</div>
  <div class="card-body">
    <h4 class="card-title">${film.original_title}</h4>
    <img src="${imgBaseUrl}${imgSizes[0]}${film.backdrop_path}"/>
    <p class="card-text">${film.overview}</p>
  </div>
</div>`;
    }
  });
};
