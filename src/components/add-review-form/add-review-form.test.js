import React from "react";
import renderer from "react-test-renderer";
import AddReviewForm from "./add-review-form";

const noop = () => {};

describe(`Render AddReviewForm`, () => {

  it(`Render AddReviewForm`, () => {
    const tree = renderer
      .create(
        <AddReviewForm
          movieId={1}
          rating={2}
          onSubmit={noop}
          commentChange={noop}
          ratingChange={noop}
          commentIsDisabled={true}
          ratingIsDisabled={true}
          btnPostIsDisabled={true}
          errorMessage={`error msg`}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
