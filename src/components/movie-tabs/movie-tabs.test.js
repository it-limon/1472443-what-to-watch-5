import React from "react";
import renderer from "react-test-renderer";
import MovieTabs from "./movie-tabs";
import {testMovie} from "../../test-dataset/test-movie";

describe(`Render MovieTabs`, () => {

  it(`Render MovieTabs with first active tab`, () => {
    const tree = renderer.create(
        <MovieTabs
          movie={testMovie}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
