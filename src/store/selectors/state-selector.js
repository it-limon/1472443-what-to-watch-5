import {createSelector} from "reselect";
import {NameSpace} from "../root-reducer";
import {getMovies} from "./data-selector";
import {ALL_GENRES} from "../../const";

export const getCurrentGenre = (state) => state[NameSpace.STATE].currentGenre;
export const getShownMoviesCount = (state) => state[NameSpace.STATE].shownMoviesCount;
export const getLastActiveMovie = (state) => state[NameSpace.STATE].lastActiveMovie;

export const getMoviesByGenre = createSelector([getMovies, getCurrentGenre, getShownMoviesCount], (movies, genre, shownMoviesCount) => {
  if (genre === ALL_GENRES) {
    return movies.slice(0, shownMoviesCount);
  } else {
    return movies.filter((currMovie) => currMovie.genre === genre).slice(0, shownMoviesCount);
  }
});
