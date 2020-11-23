import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import UserBlock from "./user-block";
import {Provider} from "react-redux";
import {Route, BrowserRouter} from "react-router-dom";
import {testUser} from "../../test-dataset/test-user";
import {AppPages} from "../../const";

const mockStore = configureStore([]);

const store = mockStore({
  USER: {
    userInfo: testUser
  }
});

describe(`Render UserBlock`, () => {
  it(`Render UserBlock without link`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <UserBlock currentPage={AppPages.MYLIST}/>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render UserBlock with link`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Route>
              <UserBlock currentPage={AppPages.MOVIE}/>
            </Route>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
