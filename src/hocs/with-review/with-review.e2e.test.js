import React from "react";
import {withReview} from "./with-review";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {DEFAULT_REVIEW_RATING} from "../../const";
import {createAPI} from "../../services/api";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

configure({adapter: new Adapter()});

const noop = () => {};

let mockStore = null;
let store = null;

const api = createAPI(() => {}, () => {});
let middlewares = [thunk.withExtraArgument(api)];

mockStore = configureStore(middlewares);
store = mockStore({});

const MockComponent = () => {
  return <div />;
};

const MockComponentWrapped = withReview(MockComponent);

it(`Should change comment/rating`, () => {
  
  const wrapper = shallow(
        <MockComponentWrapped
          store={store}
          movieId={1}
          onSendComment={noop}
        />
    ).dive();

  expect(wrapper.props().rating).toBe(DEFAULT_REVIEW_RATING);

  wrapper.props().ratingChange({ target: { value: `4` } });
  expect(wrapper.props().rating).toBe(4);

  expect(wrapper.state().commentText).toBe(``);

  wrapper.props().commentChange({ target: { value: `text` } });
  expect(wrapper.state().commentText).toBe(`text`);
});
