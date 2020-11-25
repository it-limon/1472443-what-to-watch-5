import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import MoviePage from "./movie-page";
import {Provider} from "react-redux";
import {AuthorizationStatus} from "../../const";
import {Route, BrowserRouter} from "react-router-dom";
import {createAPI} from "../../services/api";
import thunk from "redux-thunk";
import {testMovie} from "../../test-dataset/test-movie";
import {testMovies} from "../../test-dataset/test-movies";
import {testUser} from "../../test-dataset/test-user";

const noop = () => {};

let mockStore = null;
let store = null;

const api = createAPI(() => {}, () => {});
let middlewares = [thunk.withExtraArgument(api)];

describe(`Render MoviePage`, () => {

  it(`Render MoviePage`, () => {
    mockStore = configureStore(middlewares);
    store = mockStore({
      DATA: {
        movies: testMovies
      },
      STATE: {
        lastActiveMovie: testMovie,
        isPageNotFound: false
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: testUser
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Route
              render={(routeProps) => (
                <MoviePage
                  {...routeProps}
                  withLoader={false}
                  onLoadMoviePage={noop}
                />
              )}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render MoviePage (no auth)`, () => {
    mockStore = configureStore(middlewares);
    store = mockStore({
      DATA: {
        movies: testMovies
      },
      STATE: {
        lastActiveMovie: testMovie,
        isPageNotFound: false
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Route
              render={(routeProps) => (
                <MoviePage
                  {...routeProps}
                  withLoader={false}
                  onLoadMoviePage={noop}
                />
              )}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
