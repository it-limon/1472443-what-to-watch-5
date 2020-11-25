import React from "react";
import renderer from "react-test-renderer";
import {PlayerPage} from "./player-page";
import {testMovie} from "../../test-dataset/test-movie";

const noop = () => {};

describe(`Render PlayerPage`, () => {

  it(`Render PlayerPage`, () => {
    const tree = renderer
      .create(
          <PlayerPage
            movie={testMovie}
            onLoadMovie={noop}
            isPageNotFound={false}
            withLoader={false}
            match={{params: {id: `1`}}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
