import {DEFAULT_SHOWN_MOVIES_COUNT} from "../const";

export const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  INCREASE_SHOWN_MOVIES_COUNT: `INCREASE_SHOWN_MOVIES_COUNT`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_LOADING_STATUS: `SET_LOADING_STATUS`
};

export const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),
  changeMovieGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  increaseShownMoviesCount: () => ({
    type: ActionType.INCREASE_SHOWN_MOVIES_COUNT,
    payload: DEFAULT_SHOWN_MOVIES_COUNT
  }),
  requiredAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),
  setLoadingStatus: (status) => ({
    type: ActionType.SET_LOADING_STATUS,
    payload: status
  })
};
