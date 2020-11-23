import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import MyListButton from "./my-list-button";
import {Provider} from "react-redux";
import {testMovie} from "../../test-dataset/test-movie";

const noop = () => {};

describe(`Render MyListButton`, () => {
  const mockStore = configureStore([]);
  let store = null;
  let myListButtonComponent = null;

  beforeEach(() => {
    store = mockStore({});

    store.dispatch = jest.fn();

    myListButtonComponent = renderer.create(
      <Provider store={store}>
        <MyListButton
          movie={testMovie}
          onSetFavoriteMovie={noop}
        />
      </Provider>
    );
  });

  it(`Should MyListButton to store render correctly`, () => {
    expect(myListButtonComponent.toJSON()).toMatchSnapshot();
  });

  it(`Should call dispatch when button click`, () => {
    renderer.act(() => {
      myListButtonComponent.root.findByType(`button`).props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

});