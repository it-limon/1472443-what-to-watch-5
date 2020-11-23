import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Catalog from "./catalog";
import {Provider} from "react-redux";
import {testMovies} from "../../test-dataset/test-movies";

describe(`Render Catalog`, () => {
  
  describe(`Render Catalog with 0 shown movie`, () => {
    const mockStore = configureStore([]);
    let store = null;
    let catalogComponent = null;

    beforeEach(() => {
      store = mockStore({
        DATA: {
          movies: []
        },
        STATE: {
          currentGenre: `All genres`,
          shownMoviesCount: 0
        }
      });
  
      catalogComponent = renderer.create(
        <Provider store={store}>
          <Catalog />
        </Provider>
      );
    });

    it(`Should Catalog render correctly`, () => {
      expect(catalogComponent.toJSON()).toMatchSnapshot();
    });
  });

  describe(`Render Catalog with 1 shown movie`, () => {
    const mockStore = configureStore([]);
    let store = null;
    let catalogComponent = null;

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
  
      catalogComponent = renderer.create(
        <Provider store={store}>
          <Catalog />
        </Provider>
      );
    });

    it(`Should Catalog render correctly`, () => {
      expect(catalogComponent.toJSON()).toMatchSnapshot();
    });
  
    it(`Should call dispatch when button click`, () => {
      renderer.act(() => {
        catalogComponent.root.findByType(`button`).props.onClick();
      });

      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe(`Render Catalog with 2 shown movies`, () => {
    const mockStore = configureStore([]);
    let store = null;
    let catalogComponent = null;

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
  
      catalogComponent = renderer.create(
        <Provider store={store}>
          <Catalog />
        </Provider>
      );
    });

    it(`Should Catalog render correctly`, () => {
      expect(catalogComponent.toJSON()).toMatchSnapshot();
    });
  });
});
