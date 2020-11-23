import React from "react";
import renderer from "react-test-renderer";
import Footer from "./footer";
import {Route, BrowserRouter} from "react-router-dom";
import {AppPages} from "../../const";

describe(`Render Footer`, () => {

  it(`Render Footer with active link`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Route>
              <Footer
                currentPage={AppPages.MOVIE}
              />
            </Route>
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render Footer without active link`, () => {
    const tree = renderer
      .create(
          <Footer
            currentPage={AppPages.MAIN}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
