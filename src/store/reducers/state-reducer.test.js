import {testMovie} from "../../test-dataset/test-movie";
import {appState} from "./state-reducer";
import {StateActionType} from "../actions/state-action";
import {ALL_GENRES, AppRoute, DEFAULT_SHOWN_MOVIES_COUNT} from "../../const";

it(`State reducer without additional parameters should return initial state`, () => {
  expect(appState(void 0, {})).toEqual({
    currentGenre: ALL_GENRES,
    shownMoviesCount: DEFAULT_SHOWN_MOVIES_COUNT,
    url: ``,
    isPageNotFound: false,
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
  });
});

it(`Reducer should update current genre and shown movies count`, () => {
  expect(appState({
    currentGenre: ALL_GENRES,
    shownMoviesCount: DEFAULT_SHOWN_MOVIES_COUNT
  }, {
    type: StateActionType.CHANGE_MOVIE_GENRE,
    payload: `Drama`
  })).toEqual({
    currentGenre: `Drama`,
    shownMoviesCount: DEFAULT_SHOWN_MOVIES_COUNT
  });
});

it(`Reducer should increase shown movies count`, () => {
  expect(appState({
    shownMoviesCount: DEFAULT_SHOWN_MOVIES_COUNT
  }, {
    type: StateActionType.INCREASE_SHOWN_MOVIES_COUNT,
    payload: DEFAULT_SHOWN_MOVIES_COUNT * 2
  })).toEqual({
    shownMoviesCount: DEFAULT_SHOWN_MOVIES_COUNT + DEFAULT_SHOWN_MOVIES_COUNT * 2
  });
});

it(`Reducer should update url`, () => {
  expect(appState({
    url: ``
  }, {
    type: StateActionType.REDIRECT_TO_ROUTE,
    payload: AppRoute.FILMS
  })).toEqual({
    url: AppRoute.FILMS
  });
});

it(`Reducer should set last active movie`, () => {
  expect(appState({
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
  }, {
    type: StateActionType.SET_LAST_ACTIVE_MOVIE,
    payload: testMovie
  })).toEqual({
    lastActiveMovie: testMovie
  });
});

it(`Reducer should set is page not found`, () => {
  expect(appState({
    isPageNotFound: false
  }, {
    type: StateActionType.SET_IS_PAGE_NOT_FOUND,
    payload: true
  })).toEqual({
    isPageNotFound: true
  });
});
