import React from "react";
import renderer from "react-test-renderer";
import PageNotFound from "./page-not-found";

describe(`Render PageNotFound`, () => {
  it(`Render PageNotFound`, () => {
    const tree = renderer
      .create(
          <PageNotFound fromMainPage={true}/>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

