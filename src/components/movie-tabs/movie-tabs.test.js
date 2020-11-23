import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import MovieTabs from "./movie-tabs";
import {Provider} from "react-redux";
import {testMovie} from "../../test-dataset/test-movie";
import {testComments} from "../../test-dataset/test-comments";

let mockStore = null;
let store = null;

const noop = () => {};

describe(`Render MovieTabs`, () => {

  it(`Render MovieTabs with first active tab`, () => {
    const tree = renderer.create(
        <MovieTabs
          movie={testMovie}
          activeIndex={0}
          onChangeActiveIndex={noop}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render MovieTabs with second active tab`, () => {
    const tree = renderer.create(
        <MovieTabs
          movie={testMovie}
          activeIndex={1}
          onChangeActiveIndex={noop}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render MovieTabs with third active tab`, () => {
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
  });
});
