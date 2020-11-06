import {extend} from "../../../utils";
import {ActionType} from "../../action";
import {ALL_GENRES, DEFAULT_SHOWN_MOVIES_COUNT, LoadingStatus} from "../../../const";

const initialState = {
  currentGenre: ALL_GENRES,
  shownMoviesCount: DEFAULT_SHOWN_MOVIES_COUNT,
  isLoading: LoadingStatus.NOT_COMPLETED
};

export const appState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
        shownMoviesCount: initialState.shownMoviesCount
      });
    case ActionType.INCREASE_SHOWN_MOVIES_COUNT:
      return extend(state, {
        shownMoviesCount: state.shownMoviesCount + action.payload
      });
    case ActionType.SET_LOADING_STATUS:
      return extend(state, {
        isLoading: action.payload
      });
  }

  return state;
};
