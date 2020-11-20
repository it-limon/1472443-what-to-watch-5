import React from "react";
import renderer from "react-test-renderer";
import PageNotFound from "./page-not-found";
import {Route, BrowserRouter} from "react-router-dom";

describe(`Render PageNotFound`, () => {

  it(`Render PageNotFound without link to Main`, () => {
    const tree = renderer
      .create(
        <PageNotFound fromMainPage={true}/>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render PageNotFound with link to Main`, () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Route>
            <PageNotFound />
          </Route>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
