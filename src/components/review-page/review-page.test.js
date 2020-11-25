import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import ReviewPage from "./review-page";
import {Provider} from "react-redux";
import {AuthorizationStatus} from "../../const";
import {Route, BrowserRouter} from "react-router-dom";
import {createAPI} from "../../services/api";
import thunk from "redux-thunk";
import {testMovie} from "../../test-dataset/test-movie";
import {testUser} from "../../test-dataset/test-user";

const noop = () => {};

let mockStore = null;
let store = null;

const api = createAPI(() => {}, () => {});
let middlewares = [thunk.withExtraArgument(api)];

describe(`Render ReviewPage`, () => {

  it(`Render ReviewPage`, () => {
    mockStore = configureStore(middlewares);
    store = mockStore({
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
                <ReviewPage
                  {...routeProps}
                  withLoader={false}
                  onLoadMovie={noop}
                />
              )}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
