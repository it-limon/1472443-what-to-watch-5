import React from "react";
import renderer from "react-test-renderer";
import {MovieReviews} from "./movie-reviews";
import {testMovie} from "../../test-dataset/test-movie";
import {testComments} from "../../test-dataset/test-comments";

const noop = () => {};

describe(`Render MovieReviews`, () => {
  
  it(`Render MovieReviews with 3 comments`, () => {
    const tree = renderer.create(
      <MovieReviews
        movie={testMovie}
        comments={testComments}
        onLoadCommentsList={noop}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render MovieReviews with 0 comments`, () => {
    const tree = renderer.create(
      <MovieReviews
        movie={testMovie}
        comments={[]}
        onLoadCommentsList={noop}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
