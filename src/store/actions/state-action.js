import {DEFAULT_SHOWN_MOVIES_COUNT} from "../../const";

export const StateActionType = {
  CHANGE_MOVIE_GENRE: `CHANGE_MOVIE_GENRE`,
  INCREASE_SHOWN_MOVIES_COUNT: `INCREASE_SHOWN_MOVIES_COUNT`,
  SET_LOADING_STATUS: `SET_LOADING_STATUS`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`
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
  setLoadingStatus: (status) => ({
    type: StateActionType.SET_LOADING_STATUS,
    payload: status
  }),
  redirectToRoute: (url) => ({
    type: StateActionType.REDIRECT_TO_ROUTE,
    payload: url
  })
};
