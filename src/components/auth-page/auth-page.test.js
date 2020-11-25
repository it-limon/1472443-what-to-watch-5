import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import AuthPage from "./auth-page";
import {Provider} from "react-redux";
import {Route, BrowserRouter} from "react-router-dom";
import {AuthorizationStatus} from "../../const";

const noop = () => {};

describe(`Render AuthPage`, () => {
  const mockStore = configureStore([]);
  let store = null;
  let authPageComponent = null;

  beforeEach(() => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH
      }
    });

    authPageComponent = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Route>
              <AuthPage
                onUserLogin={noop}
              />
            </Route>
          </BrowserRouter>
        </Provider>
    );
  });

  it(`Should AuthPage connected to store render correctly`, () => {
    expect(authPageComponent.toJSON()).toMatchSnapshot();
  });

});
