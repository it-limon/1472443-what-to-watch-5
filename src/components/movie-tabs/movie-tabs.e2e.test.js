import React from "react";
import MovieTabs from "./movie-tabs";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {testMovie} from "../../test-dataset/test-movie";

configure({adapter: new Adapter()});

it(`Should pass the right argument of current tab be clicked`, () => {
  const onChangeActiveIndex = jest.fn();

  const wrapper = shallow(
      <MovieTabs
        movie={testMovie}
        activeIndex={0}
        onChangeActiveIndex={onChangeActiveIndex}
      />
  );

  const movieTabs = wrapper.find(`.movie-nav__link`);

  movieTabs.forEach((movieTab, i) => {
    movieTab.simulate(`click`, {preventDefault: jest.fn()});
    expect(onChangeActiveIndex).toHaveBeenCalledWith(i);
  });
});
