import {createSelector} from "reselect";
import {NameSpace} from "../root-reducer";
import {getMovies} from "./data-selector";
import {ALL_GENRES} from "../../const";

export const getCurrentGenre = (state) => state[NameSpace.STATE].currentGenre;
export const getLoadingStatus = (state) => state[NameSpace.STATE].isLoading;
export const getShownMoviesCount = (state) => state[NameSpace.STATE].shownMoviesCount;

export const getMoviesByGenre = createSelector([getMovies, getCurrentGenre], (movies, genre) => {
  if (genre === ALL_GENRES) {
    return movies;
  } else {
    return movies.filter((currMovie) => currMovie.genre === genre);
  }
});
