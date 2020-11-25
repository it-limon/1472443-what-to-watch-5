import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../services/api";
import {testMovie} from "../../test-dataset/test-movie";
import {testMovies} from "../../test-dataset/test-movies";
import {testComments} from "../../test-dataset/test-comments";
import {appData} from "./data-reducer";
import {DataActionType} from "../actions/data-action";
import {StateActionType} from "../actions/state-action";
import {loadPromoMovie, loadMoviesList, loadFavoriteMoviesList, loadCommentsList, sendComment, setFavoriteMovie} from "../api-actions";
import {APIRoute, AppRoute} from "../../const";

const api = createAPI(() => {}, () => {});

it(`Data reducer without additional parameters should return initial state`, () => {
  expect(appData(void 0, {})).toEqual({
    promoMovie: {},
    movies: [],
    favoriteMovies: [],
    comments: []
  });
});

it(`Reducer should update promo movie by load promo movie`, () => {
  expect(appData({
    promoMovie: {},
  }, {
    type: DataActionType.LOAD_PROMO_MOVIE,
    payload: testMovie,
  })).toEqual({
    promoMovie: testMovie
  });
});

it(`Reducer should update movies by load movies`, () => {
  expect(appData({
    movies: [],
  }, {
    type: DataActionType.LOAD_MOVIES,
    payload: testMovies,
  })).toEqual({
    movies: testMovies
  });
});

it(`Reducer should update favorite movies by load favorite movies`, () => {
  expect(appData({
    favoriteMovies: [],
  }, {
    type: DataActionType.LOAD_FAVORITE_MOVIES,
    payload: testMovies,
  })).toEqual({
    favoriteMovies: testMovies
  });
});

it(`Reducer should update comments by load comments`, () => {
  expect(appData({
    comments: [],
  }, {
    type: DataActionType.LOAD_COMMENTS,
    payload: testComments,
  })).toEqual({
    comments: testComments
  });
});

describe(`Async data operations work correctly`, () => {

  it(`Should make a correct API call to /films/promo`, () => {
    const dispatch = jest.fn();

    const apiMock = new MockAdapter(api);
    apiMock
      .onGet(APIRoute.PROMO_FILM)
      .reply(200, {fake: true});

    const promoMovieLoader = loadPromoMovie();

    return promoMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.LOAD_PROMO_MOVIE,
          payload: {fake: true}
        });
      });
  });

  it(`Should make a correct API call to /films`, () => {
    const dispatch = jest.fn();

    const apiMock = new MockAdapter(api);
    apiMock
      .onGet(APIRoute.FILMS)
      .reply(200, [{fake: true}]);

    const moviesListLoader = loadMoviesList();

    return moviesListLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.LOAD_MOVIES,
          payload: [{fake: true}]
        });
      });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const dispatch = jest.fn();

    const apiMock = new MockAdapter(api);
    apiMock
      .onGet(APIRoute.FAVORITE_FILMS)
      .reply(200, [{fake: true}]);

    const favoriteMoviesListLoader = loadFavoriteMoviesList(() => {});

    return favoriteMoviesListLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.LOAD_FAVORITE_MOVIES,
          payload: [{fake: true}]
        });
      });
  });

  it(`Should make a correct API call to /comments GET`, () => {
    const dispatch = jest.fn();

    const apiMock = new MockAdapter(api);
    apiMock
      .onGet(`${APIRoute.COMMENTS}/1`)
      .reply(200, [{fake: true}]);

    const commentsListLoader = loadCommentsList(1);

    return commentsListLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.LOAD_COMMENTS,
          payload: [{fake: true}]
        });
      });
  });

  it(`Should make a correct API call to /comments POST`, () => {
    const dispatch = jest.fn();

    const apiMock = new MockAdapter(api);
    apiMock
      .onPost(`${APIRoute.COMMENTS}/1`, {rating: 8, comment: `test comment`})
      .reply(200, [{fake: true}]);

    const commentSender = sendComment(1, {movieRating: 8, movieComment: `test comment`}, () => {});

    return commentSender(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionType.LOAD_COMMENTS,
          payload: [{fake: true}]
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: StateActionType.REDIRECT_TO_ROUTE,
          payload: `${AppRoute.FILMS}/1`
        });
      });
  });

  it(`Should make a correct API call to /favorite POST`, () => {
    const dispatch = jest.fn();
    const state = {
      DATA: {
        promoMovie: testMovie
      },
      STATE: {
        lastActiveMovie: testMovie
      }
    };

    const apiMock = new MockAdapter(api);
    apiMock
      .onPost(`${APIRoute.FAVORITE_FILMS}/1/0`)
      .reply(200, {fake: true});

    const favoriteMovieSetter = setFavoriteMovie(1, 0);

    return favoriteMovieSetter(dispatch, () => state, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: StateActionType.SET_LAST_ACTIVE_MOVIE,
          payload: {fake: true}
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: DataActionType.LOAD_PROMO_MOVIE,
          payload: {fake: true}
        });
      });
  });

});
