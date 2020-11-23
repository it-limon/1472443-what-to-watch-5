import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Breadcrumbs from "./breadcrumbs";
import {Provider} from "react-redux";
import {Route, BrowserRouter} from "react-router-dom";
import {testMovie} from "../../test-dataset/test-movie";

describe(`Render Breadcrumbs`, () => {
  const mockStore = configureStore([]);
  let store = null;
  let breadcrumbsComponent = null;

  beforeEach(() => {
    store = mockStore({
      STATE: {
        lastActiveMovie: testMovie
      }
    });

    breadcrumbsComponent = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Route>
              <Breadcrumbs />
            </Route>
          </BrowserRouter>
        </Provider>
    );
  });

  it(`Should Breadcrumbs to store render correctly`, () => {
    expect(breadcrumbsComponent.toJSON()).toMatchSnapshot();
  });

});
