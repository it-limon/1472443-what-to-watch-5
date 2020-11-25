import React from "react";
import SmallMovieCard from "./small-movie-card";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {testMovie} from "../../test-dataset/test-movie";

configure({
  adapter: new Adapter(),
});

it(`SmallMovieCard be hovered`, () => {
  const onChangeActiveState = jest.fn();

  const wrapper = shallow(
      <SmallMovieCard
        movie={testMovie}
        isActive={false}
        onChangeActiveState={onChangeActiveState}
      />
  );

  const movieCard = wrapper.find(`.small-movie-card`);

  movieCard.simulate(`mouseenter`);
  expect(onChangeActiveState).toHaveBeenCalledTimes(1);
  movieCard.simulate(`mouseout`);
  expect(onChangeActiveState).toHaveBeenCalledTimes(1);
});
