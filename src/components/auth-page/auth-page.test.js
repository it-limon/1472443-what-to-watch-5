import React from "react";
import renderer from "react-test-renderer";
import AuthPage from "./header";

const noop = () => {};

describe(`Render AuthPage`, () => {

  it(`Render AuthPage`, () => {
    const tree = renderer
      .create(
        <AuthPage
          loginRef={}
          passwordRef={}
          isInvalidLogin={}
          isInvalidPassword={}
          onSubmit={noop}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
