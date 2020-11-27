import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import App from "./app";
import {Provider} from "react-redux";
import {Route, BrowserRouter} from "react-router-dom";
import {AuthorizationStatus} from "../../const";
import {testMovie} from "../../test-dataset/test-movie";
import {testMovies} from "../../test-dataset/test-movies";
import {testUser} from "../../test-dataset/test-user";

let mockStore = null;
let store = null;

describe(`Render App`, () => {
  it(`Render App`, () => {
    mockStore = configureStore({});

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
              <App />
            </Route>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
