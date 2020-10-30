import {extend, getFilteredMoviesByGenre} from "../utils";
import {ActionType} from "./action";
import movies from "../mocks/movies";
import {ALL_GENRES, DEFAULT_SHOWN_MOVIES_COUNT} from "../const";

const initialState = {
  filteredMovies: movies,
  currentMovieGenreKey: ALL_GENRES.key,
  shownMoviesCount: DEFAULT_SHOWN_MOVIES_COUNT
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_MOVIE_GENRE:
      return extend(state, {
        currentMovieGenreKey: action.payload,
        filteredMovies: getFilteredMoviesByGenre(movies, action.payload),
        shownMoviesCount: initialState.shownMoviesCount
      });
    case ActionType.INCREASE_SHOWN_MOVIES_COUNT:
      return extend(state, {
        shownMoviesCount: state.shownMoviesCount + DEFAULT_SHOWN_MOVIES_COUNT
      });
  }

  return state;
};
