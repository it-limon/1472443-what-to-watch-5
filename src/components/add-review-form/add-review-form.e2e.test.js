import React, {useState as useStateMock} from "react";
import {AddReviewForm} from "./add-review-form";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

jest.mock(`react`, () => ({
  ...jest.requireActual(`react`),
  useState: jest.fn(),
}));

describe(`<AddReviewForm />`, () => {
  let wrapper;
  const setRating = jest.fn();
  const onSendComment = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation((init) => [init, setRating]);

    wrapper = shallow(
        <AddReviewForm
          movieId={1}
          onSendComment={onSendComment}
        />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`AddReviewForm sent`, () => {
    const form = wrapper.find(`form`);
    const formSendPrevention = jest.fn();

    form.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(onSendComment).toHaveBeenCalledTimes(1);
  });

  it(`Should pass the right argument of current rating be clicked`, () => {
    const input4Rating = wrapper.find(`.rating__input`).at(3);

    input4Rating.simulate(`change`, {target: {value: 4}});
    expect(setRating).toHaveBeenCalledWith(4);
  });

});
