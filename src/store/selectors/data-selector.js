import {createSelector} from "reselect";
import {ALL_GENRES, SIMILAR_MOVIES_COUNT, MAX_GENRES_COUNT} from "../../const";
import {NameSpace} from "../root-reducer";

export const getMovies = (state) => state[NameSpace.DATA].movies;
export const getPromoMovie = (state) => state[NameSpace.DATA].promoMovie;
export const getComments = (state) => state[NameSpace.DATA].comments;
export const getMovieId = (_, id) => parseInt(id, 10);

export const getGenres = createSelector([getMovies], (movies) => {
  const genres = Array.from(new Set(movies.map((it) => it.genre))).sort((a, b) => a.localeCompare(b)).slice(0, MAX_GENRES_COUNT);
  return [ALL_GENRES, ...genres];
});

export const getMovieById = createSelector([getMovies, getMovieId], (movies, movieId) => {
  const [movie] = movies.filter((it) => it.id === movieId);
  return movie;
});

export const getSimilarMovies = createSelector(([getMovies, getMovieById]), (movies, movie) => {
  return movies.filter((it) => (it.id !== movie.id) && (it.genre === movie.genre)).slice(0, SIMILAR_MOVIES_COUNT);
});
