import React from "react";
import {ShowMoreButton} from "./show-more-button";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {testMovies} from "../../test-dataset/test-movies";

configure({
  adapter: new Adapter(),
});

it(`Should button be clicked`, () => {
  const onIncreaseShownMoviesCount = jest.fn();

  const wrapper = mount(
      <ShowMoreButton
        movies={testMovies}
        shownMoviesCount={1}
        onIncreaseShownMoviesCount={onIncreaseShownMoviesCount}
      />
  );

  const btn = wrapper.find(`.catalog__button`);
  btn.simulate(`click`);

  expect(onIncreaseShownMoviesCount).toHaveBeenCalledTimes(1);
});
