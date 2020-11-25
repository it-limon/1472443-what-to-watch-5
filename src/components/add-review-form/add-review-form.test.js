import React from "react";
import renderer from "react-test-renderer";
import {AddReviewForm} from "./add-review-form";

const noop = () => {};

describe(`Render AddReviewForm`, () => {

  it(`Render AddReviewForm`, () => {
    const tree = renderer
      .create(
          <AddReviewForm
            movieId={1}
            onSendComment={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
