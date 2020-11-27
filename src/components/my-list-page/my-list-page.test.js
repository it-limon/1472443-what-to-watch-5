import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import MyListPage from "./my-list-page";
import {Provider} from "react-redux";
import {AuthorizationStatus} from "../../const";
import {Route, BrowserRouter} from "react-router-dom";
import {createAPI} from "../../services/api";
import thunk from "redux-thunk";
import {testMovies} from "../../test-dataset/test-movies";
import {testUser} from "../../test-dataset/test-user";

const noop = () => {};

let mockStore = null;
let store = null;

const api = createAPI(() => {}, () => {});
let middlewares = [thunk.withExtraArgument(api)];

describe(`Render MyListPage`, () => {

  it(`Render MyListPage with 2 favorite movies`, () => {
    mockStore = configureStore(middlewares);
    store = mockStore({
      DATA: {
        favoriteMovies: testMovies
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
              <MyListPage
                onLoadFavoriteMoviesList={noop}
              />
            </Route>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render MyListPage without favorite movies`, () => {
    mockStore = configureStore(middlewares);
    store = mockStore({
      DATA: {
        favoriteMovies: []
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
              <MyListPage
                onLoadFavoriteMoviesList={noop}
              />
            </Route>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
