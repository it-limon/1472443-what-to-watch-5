import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import MoviePage from "./movie-page";
import {Provider} from "react-redux";
import {testMovie} from "../../test-dataset/test-movie";
import {testMovies} from "../../test-dataset/test-movies";
import {testComments} from "../../test-dataset/test-comments";
import {AuthorizationStatus} from "../../const";
import {Route, BrowserRouter} from "react-router-dom";

let mockStore = null;
let store = null;

const noop = () => {};

describe(`Render MoviePage`, () => {

  it(`Render MoviePage with first active tab`, () => {
    mockStore = configureStore([]);
    store = mockStore({
      DATA: {
        movies: testMovies
      },
      STATE: {
        lastActiveMovie: testMovie,
        isPageNotFound: false
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });

    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Route>
            <MoviePage
              withLoader={true}
              onLoadMoviePage={noop}
            />
          </Route>
        </BrowserRouter>
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  /*it(`Render MoviePage with first active tab`, () => {
    mockStore = configureStore([]);
    store = mockStore({
      DATA: {
        comments: testComments
      }
    });

    const tree = renderer.create(
      <Provider store={store}>
        <MovieTabs
          movie={testMovie}
          activeIndex={2}
          onChangeActiveIndex={noop}
        />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });*/
});
