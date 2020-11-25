import React, {useState as useStateMock} from "react";
import SmallMovieCard from "./small-movie-card";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {testMovie} from "../../test-dataset/test-movie";

configure({
  adapter: new Adapter(),
});

jest.mock(`react`, () => ({
  ...jest.requireActual(`react`),
  useState: jest.fn(),
}));

it(`SmallMovieCard be hovered`, () => {
  const setIsActive = jest.fn();
  useStateMock.mockImplementation((init) => [init, setIsActive]);

  const wrapper = shallow(
      <SmallMovieCard
        movie={testMovie}
      />
  );

  const smallMovieCard = wrapper.find(`.small-movie-card`);

  smallMovieCard.simulate(`mouseenter`);
  expect(setIsActive).toHaveBeenCalledTimes(1);
  smallMovieCard.simulate(`mouseout`);
  expect(setIsActive).toHaveBeenCalledTimes(1);
});
