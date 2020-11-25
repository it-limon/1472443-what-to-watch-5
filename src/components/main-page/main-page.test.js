import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import MainPage from "./main-page";
import {Provider} from "react-redux";
import {Route, BrowserRouter} from "react-router-dom";
import {AuthorizationStatus} from "../../const";
import {testMovie} from "../../test-dataset/test-movie";
import {testMovies} from "../../test-dataset/test-movies";
import {testUser} from "../../test-dataset/test-user";
import {createAPI} from "../../services/api";
import thunk from "redux-thunk";

const noop = () => {};

let mockStore = null;
let store = null;

const api = createAPI(() => {}, () => {});
let middlewares = [thunk.withExtraArgument(api)];

describe(`Render MainPage`, () => {
  it(`Render MainPage loaded`, () => {
    mockStore = configureStore(middlewares);

    store = mockStore({
      DATA: {
        movies: testMovies,
        promoMovie: testMovie
      },
      STATE: {
        lastActiveMovie: testMovie,
        isPageNotFound: false,
        currentGenre: `All genres`,
        shownMoviesCount: 2
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: testUser
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Route>
              <MainPage
                withLoader={false}
                onLoadMainPage={noop}
              />
            </Route>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render MainPage not found`, () => {
    mockStore = configureStore(middlewares);

    store = mockStore({
      DATA: {
        movies: testMovies,
        promoMovie: testMovie
      },
      STATE: {
        lastActiveMovie: testMovie,
        isPageNotFound: true,
        currentGenre: `All genres`,
        shownMoviesCount: 2
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: testUser
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Route>
              <MainPage
                withLoader={false}
                onLoadMainPage={noop}
              />
            </Route>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
