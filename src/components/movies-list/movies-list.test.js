import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list";
import {testMovies} from "../../test-dataset/test-movies";

describe(`Render MoviesList`, () => {

  it(`With 2 movies`, () => {
    const tree = renderer.create(
      <MoviesList movies={testMovies}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With 0 movies`, () => {
    const tree = renderer.create(
      <MoviesList movies={[]}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
