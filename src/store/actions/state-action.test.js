import {StateActionType, StateActionCreator} from "../actions/state-action";
import {testMovie} from "../../test-dataset/test-movie";
import {ALL_GENRES, DEFAULT_SHOWN_MOVIES_COUNT, AppRoute} from "../../const";

describe(`StateActionCreator work correctly`, () => {

  it(`Action creator for set last active movie returns correct action`, () => {
    expect(StateActionCreator.setLastActiveMovie(testMovie)).toEqual({
      type: StateActionType.SET_LAST_ACTIVE_MOVIE,
      payload: testMovie
    });
  });

  it(`Action creator for change movie genre returns correct action`, () => {
    expect(StateActionCreator.changeMovieGenre(ALL_GENRES)).toEqual({
      type: StateActionType.CHANGE_MOVIE_GENRE,
      payload: ALL_GENRES
    });
  });

  it(`Action creator for increase shown movies count returns correct action`, () => {
    expect(StateActionCreator.increaseShownMoviesCount(DEFAULT_SHOWN_MOVIES_COUNT)).toEqual({
      type: StateActionType.INCREASE_SHOWN_MOVIES_COUNT,
      payload: DEFAULT_SHOWN_MOVIES_COUNT
    });
  });

  it(`Action creator for redirect to route returns correct action`, () => {
    expect(StateActionCreator.redirectToRoute(AppRoute.FILMS)).toEqual({
      type: StateActionType.REDIRECT_TO_ROUTE,
      payload: AppRoute.FILMS
    });
  });

  it(`Action creator for set is page not found returns correct action`, () => {
    expect(StateActionCreator.setIsPageNotFound(true)).toEqual({
      type: StateActionType.SET_IS_PAGE_NOT_FOUND,
      payload: true
    });
  });
});
