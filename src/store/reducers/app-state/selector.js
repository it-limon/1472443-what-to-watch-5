import {createSelector} from "reselect";
import {NameSpace} from "../../root-reducer";
import {getMovies} from "../app-data/selector";
import {ALL_GENRES} from "../../../const";

export const getGenre = (state) => state[NameSpace.APP_STATE].currentGenre;
export const getLoadingStatus = (state) => state[NameSpace.APP_STATE].isLoading;
export const getShownMoviesCount = (state) => state[NameSpace.APP_STATE].shownMoviesCount;

export const getMoviesByGenre = createSelector([getMovies, getGenre], (movies, genre) => {
  if (genre === ALL_GENRES) {
    return movies;
  } else {
    return movies.filter((currMovie) => currMovie.genre === genre);
  }
});

