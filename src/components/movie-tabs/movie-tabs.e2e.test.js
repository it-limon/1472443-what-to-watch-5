import React, {useState as useStateMock} from "react";
import MovieTabs from "./movie-tabs";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {testMovie} from "../../test-dataset/test-movie";

configure({adapter: new Adapter()});

jest.mock(`react`, () => ({
  ...jest.requireActual(`react`),
  useState: jest.fn(),
}));

describe(`<MovieTabs />`, () => {
  let wrapper;
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation((init) => [init, setState]);

    wrapper = shallow(
        <MovieTabs
          movie={testMovie}
        />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`Should pass the right argument of current tab be clicked`, () => {
    const movieTabs = wrapper.find(`.movie-nav__link`);

    movieTabs.forEach((movieTab, i) => {
      movieTab.simulate(`click`, {preventDefault: jest.fn()});
      expect(setState).toHaveBeenCalledWith(i);
    });
  });

});
