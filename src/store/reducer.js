import {extend, getFilteredMovies} from "../utils";
import {ActionType} from "./action";
import movies from "../mocks/movies";

const initialState = {
  currentMovieGenreKey: 0,
  allMovies: movies,
  filteredMovies: movies
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_MOVIE_GENRE:
      return extend(state, {
        currentMovieGenreKey: action.payload,
        filteredMovies: getFilteredMovies(initialState.allMovies, action.payload)
      });
  }

  return state;
};
