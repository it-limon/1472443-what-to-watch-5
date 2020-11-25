import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card";
import {testMovie} from "../../test-dataset/test-movie";

const noop = () => {};

describe(`Render SmallMovieCard`, () => {

  it(`Render SmallMovieCard (active)`, () => {
    const tree = renderer
      .create(
          <SmallMovieCard
            movie={testMovie}
            isActive={true}
            onChangeActiveState={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render SmallMovieCard (not active)`, () => {
    const tree = renderer
      .create(
          <SmallMovieCard
            movie={testMovie}
            isActive={false}
            onChangeActiveState={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
