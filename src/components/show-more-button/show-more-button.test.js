import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import ShowMoreButton from "./show-more-button";
import {Provider} from "react-redux";
import {testMovies} from "../../test-dataset/test-movies";

const noop = () => {};

describe(`Render ShowMoreButton`, () => {
  
  describe(`Render ShowMoreButton with 1 shown movie`, () => {
    const mockStore = configureStore([]);
    let store = null;
    let showMoreButtonComponent = null;

    beforeEach(() => {
      store = mockStore({
        DATA: {
          movies: testMovies
        },
        STATE: {
          currentGenre: `All genres`,
          shownMoviesCount: 1
        }
      });
  
      store.dispatch = jest.fn();
  
      showMoreButtonComponent = renderer.create(
        <Provider store={store}>
          <ShowMoreButton onIncreaseShownMoviesCount={noop} />
        </Provider>
      );
    });

    it(`Should GenresList render correctly`, () => {
      expect(showMoreButtonComponent.toJSON()).toMatchSnapshot();
    });
  
    it(`Should call dispatch when button click`, () => {
      renderer.act(() => {
        showMoreButtonComponent.root.findByType(`button`).props.onClick();
      });

      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe(`Render ShowMoreButton with 2 shown movies`, () => {
    const mockStore = configureStore([]);
    let store = null;
    let showMoreButtonComponent = null;

    beforeEach(() => {
      store = mockStore({
        DATA: {
          movies: testMovies
        },
        STATE: {
          currentGenre: `All genres`,
          shownMoviesCount: 2
        }
      });
  
      showMoreButtonComponent = renderer.create(
        <Provider store={store}>
          <ShowMoreButton onIncreaseShownMoviesCount={noop} />
        </Provider>
      );
    });

    it(`Should GenresList render correctly`, () => {
      expect(showMoreButtonComponent.toJSON()).toMatchSnapshot();
    });
  });
});
