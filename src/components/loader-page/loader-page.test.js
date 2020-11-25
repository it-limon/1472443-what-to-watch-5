import React from "react";
import renderer from "react-test-renderer";
import LoaderPage from "./loader-page";

describe(`Render LoaderPage`, () => {
  it(`Render LoaderPage`, () => {
    const tree = renderer
      .create(
          <LoaderPage />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
