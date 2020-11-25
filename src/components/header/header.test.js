import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Header from "./header";
import {Provider} from "react-redux";
import {Route, BrowserRouter} from "react-router-dom";
import {AuthorizationStatus, AppPages} from "../../const";
import {testMovie} from "../../test-dataset/test-movie";
import {testUser} from "../../test-dataset/test-user";

let mockStore = null;
let store = null;

describe(`Render Header`, () => {

  it(`Render Header (no auth)`, () => {
    mockStore = configureStore([]);
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Route>
              <Header currentPage={AppPages.MAIN}/>
            </Route>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render Header (auth)`, () => {
    mockStore = configureStore([]);
    store = mockStore({
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
              <Header currentPage={AppPages.REVIEW}/>
            </Route>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
