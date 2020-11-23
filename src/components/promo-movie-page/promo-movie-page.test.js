import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import PromoMoviePage from "./promo-movie-page";
import {Provider} from "react-redux";
import {Route, BrowserRouter} from "react-router-dom";
import {AuthorizationStatus} from "../../const";
import {testMovie} from "../../test-dataset/test-movie";
import {testUser} from "../../test-dataset/test-user";

let mockStore = null;
let store = null;

describe(`Render PromoMoviePage`, () => {
  
  it(`Render PromoMoviePage (no auth)`, () => {
    mockStore = configureStore([]);
    store = mockStore({
      DATA: {
        promoMovie: testMovie
      },
      STATE: {
        lastActiveMovie: testMovie
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH
      }
    });

    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Route>
            <PromoMoviePage />
          </Route>
        </BrowserRouter>
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render PromoMoviePage (auth)`, () => {
    mockStore = configureStore([]);
    store = mockStore({
      DATA: {
        promoMovie: testMovie
      },
      STATE: {
        lastActiveMovie: testMovie
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
            <PromoMoviePage />
          </Route>
        </BrowserRouter>
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
