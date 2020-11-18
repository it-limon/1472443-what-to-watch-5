import {extend} from "../../utils";
import {StateActionType} from "../actions/state-action";
import {ALL_GENRES, DEFAULT_SHOWN_MOVIES_COUNT} from "../../const";

const initialState = {
  currentGenre: ALL_GENRES,
  shownMoviesCount: DEFAULT_SHOWN_MOVIES_COUNT,
  url: ``,
  lastActiveMovie: {
    id: -1,
    name: ``,
    posterImage: ``,
    previewImage: ``,
    backgroundImage: ``,
    backgroundColor: ``,
    videoLink: ``,
    previewVideoLink: ``,
    description: ``,
    rating: 0,
    scoresCount: 0,
    director: ``,
    starring: [],
    runTime: 0,
    genre: ``,
    released: 0,
    isFavorite: false
  }
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
    case StateActionType.REDIRECT_TO_ROUTE:
      return extend(state, {
        url: action.payload
      });
    case StateActionType.SET_LAST_ACTIVE_MOVIE:
      return extend(state, {
        lastActiveMovie: action.payload
      });
  }

  return state;
};
