import {extend} from "../../utils";
import {StateActionType} from "../actions/state-action";
import {ALL_GENRES, DEFAULT_SHOWN_MOVIES_COUNT, LoadingStatus} from "../../const";

const initialState = {
  currentGenre: ALL_GENRES,
  shownMoviesCount: DEFAULT_SHOWN_MOVIES_COUNT,
  isLoading: LoadingStatus.NOT_COMPLETED,
  url: ``,
};

export const appState = (state = initialState, action) => {
  switch (action.type) {
    case StateActionType.CHANGE_MOVIE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
        shownMoviesCount: initialState.shownMoviesCount
      });
    case StateActionType.INCREASE_SHOWN_MOVIES_COUNT:
      return extend(state, {
        shownMoviesCount: state.shownMoviesCount + action.payload
      });
    case StateActionType.SET_LOADING_STATUS:
      return extend(state, {
        isLoading: action.payload
      });
    case StateActionType.REDIRECT_TO_ROUTE:
      return extend(state, {
        url: action.payload
      });
  }

  return state;
};
