import React from "react";
import renderer from "react-test-renderer";
import Breadcrumbs from "./breadcrumbs";
import {Route, BrowserRouter} from "react-router-dom";

describe(`Render Breadcrumbs`, () => {

  it(`Render Breadcrumbs`, () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Route>
            <Breadcrumbs
              movieId={1}
              movieName={`name`}
            />
          </Route>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
