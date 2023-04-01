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
let genres;
let films;
let filmsGenres;

const getFilms = async (name) => {
  try {
    conf = await axios.get(`${BASE_URL.ROOT}/configuration${BASE_URL.API_KEY}`);
    res = await axios.get(
      `${BASE_URL.ROOT}/search/movie${BASE_URL.API_KEY}&query=${name}`
    );
    genres = await axios.get(
      `${BASE_URL.ROOT}/genre/movie/list${BASE_URL.API_KEY}`
    );
    films = res.data.results;
    setGenresArray(genres.data.genres, films);
    imgBaseUrl = conf.data.images.base_url;
    imgSizes = conf.data.images.backdrop_sizes;
    paintFilms(res.data.results);
  } catch (e) {
    console.log(e);
  }
};

const paintFilms = (films) => {
  cardSection.innerHTML = ``;
  films.forEach((film) => {
    let badges = "";
    film.genresName.forEach((el) => {
      badges += `<span class="badge rounded-pill bg-dark">${el.name}</span>`;
    });
    if (film.backdrop_path) {
      cardSection.innerHTML +=
        `<div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
  <div class="card-header">Film</div>
  <div class="card-body">
    <h4 class="card-title">${film.original_title}</h4>
    <img class="w-80" src="${imgBaseUrl}${imgSizes[0]}${film.backdrop_path}"/>
    <p class="card-text" style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 5;-webkit-box-orient: vertical;">${film.overview}</p>` +
        `${badges}` +
        ` </div>
</div>`;
    }
  });
};

const setGenresArray = (genres, films) => {
  const genresNameArray = [];
  filmsGenres = films.map((film) => {
    film.genre_ids.forEach((genId) => {
      const genre = genres.filter((el) => el.id === genId)[0];
      if (!genresNameArray.includes(genre)) {
        genresNameArray.push(genre);
      }
    });
    film["genresName"] = [...genresNameArray];
    return film;
  });
  console.log(filmsGenres);
};
