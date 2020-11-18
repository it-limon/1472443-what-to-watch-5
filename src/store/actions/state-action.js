import {DEFAULT_SHOWN_MOVIES_COUNT} from "../../const";

export const StateActionType = {
  CHANGE_MOVIE_GENRE: `CHANGE_MOVIE_GENRE`,
  INCREASE_SHOWN_MOVIES_COUNT: `INCREASE_SHOWN_MOVIES_COUNT`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
  SET_LAST_ACTIVE_MOVIE: `SET_LAST_ACTIVE_MOVIE`
};

export const StateActionCreator = {
  changeMovieGenre: (genre) => ({
    type: StateActionType.CHANGE_MOVIE_GENRE,
    payload: genre
  }),
  increaseShownMoviesCount: () => ({
    type: StateActionType.INCREASE_SHOWN_MOVIES_COUNT,
    payload: DEFAULT_SHOWN_MOVIES_COUNT
  }),
  redirectToRoute: (url) => ({
    type: StateActionType.REDIRECT_TO_ROUTE,
    payload: url
  }),
  setLastActiveMovie: (movie) => ({
    type: StateActionType.SET_LAST_ACTIVE_MOVIE,
    payload: movie
  }),
};
