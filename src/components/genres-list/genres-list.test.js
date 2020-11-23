import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import GenresList from "./genres-list";
import {Provider} from "react-redux";
import {testMovies} from "../../test-dataset/test-movies";

const noop = () => {};

describe(`Render GenresList`, () => {
  const mockStore = configureStore([]);
  let store = null;
  let genresListComponent = null;

  beforeEach(() => {
    store = mockStore({
      DATA: {
        movies: [testMovies]
      },
      STATE: {
        currentGenre: `Crime`
      }
    });

    store.dispatch = jest.fn();

    genresListComponent = renderer.create(
      <Provider store={store}>
        <GenresList onChangeMovieGenre={noop}/>
      </Provider>
    );
  });

  it(`Should GenresList connected to store render correctly`, () => {
    expect(genresListComponent.toJSON()).toMatchSnapshot();
  });

  it(`Should call dispatch when button click`, () => {
    renderer.act(() => {
      genresListComponent.root.findAllByProps({className: "catalog__genres-item"})[0].props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

});
