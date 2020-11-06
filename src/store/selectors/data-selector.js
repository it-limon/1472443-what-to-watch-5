import {createSelector} from "reselect";
import {ALL_GENRES, SIMILAR_MOVIES_COUNT} from "../../const";
import {NameSpace} from "../root-reducer";

export const getMovies = (state) => state[NameSpace.DATA].movies;
export const getMovieId = (_, id) => parseInt(id, 10);

export const getGenres = createSelector([getMovies], (movies) => {
  return [ALL_GENRES, ...Array.from(new Set(movies.map((it) => it.genre))).sort((a, b) => a.localeCompare(b))];
});

export const getMovieById = createSelector([getMovies, getMovieId], (movies, movieId) => {
  const [movie] = movies.filter((it) => it.id === movieId);
  return movie;
});

export const getSimilarMovies = createSelector(([getMovies, getMovieById]), (movies, movie) => {
  return movies.filter((it) => (it.id !== movie.id) && (it.genre === movie.genre)).slice(0, SIMILAR_MOVIES_COUNT);
});
