import React from "react";
import AddReviewForm from "./add-review-form";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

const noop = () => {};

it(`Form sent`, () => {
  const onSubmit = jest.fn();

  const addReviewForm = shallow(
        <AddReviewForm
          movieId={1}
          rating={2}
          onSubmit={onSubmit}
          onCommentChange={noop}
          onRatingChange={noop}
          commentIsDisabled={false}
          ratingIsDisabled={false}
          btnPostIsDisabled={false}
          errorMessage={``}
        />
    );

  const form = addReviewForm.find(`form`);
  form.simulate(`submit`);

  expect(onSubmit).toHaveBeenCalledTimes(1);
});