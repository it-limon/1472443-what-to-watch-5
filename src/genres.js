import movies from "../src/mocks/movies";
import {ALL_GENRES} from "./const";

const genresList = [
  {
    key: 1,
    ord: 1,
    name: `Comedie`,
    filterName: `Comedies`
  },
  {
    key: 2,
    ord: 2,
    name: `Crime`,
    filterName: `Crime`
  },
  {
    key: 3,
    ord: 3,
    name: `Documentary`,
    filterName: `Documentary`
  },
  {
    key: 4,
    ord: 4,
    name: `Drama`,
    filterName: `Dramas`
  },
  {
    key: 5,
    ord: 5,
    name: `Horror`,
    filterName: `Horror`
  },
  {
    key: 6,
    ord: 6,
    name: `Kids & Family`,
    filterName: `Kids & Family`
  },
  {
    key: 7,
    ord: 7,
    name: `Romance`,
    filterName: `Romance`
  },
  {
    key: 8,
    ord: 8,
    name: `Sci-Fi`,
    filterName: `Sci-Fi`
  },
  {
    key: 9,
    ord: 9,
    name: `Thriller`,
    filterName: `Thrillers`
  }
];

const genresKeys = [ALL_GENRES.key, ...movies.map((movie) => movie.genreKey)];
const genres = [ALL_GENRES, ...genresList.filter((genre) => genresKeys.includes(genre.key))];

export default genres;
