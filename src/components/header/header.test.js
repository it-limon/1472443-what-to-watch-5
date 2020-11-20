import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header";
import {Route, BrowserRouter} from "react-router-dom";
import {AppPages} from "../../const";

const noAuthUserInfo = {
  id: -1,
  email: ``,
  name: ``,
  avatarUrl: ``
};

const userInfo = {
  id: 1,
  email: `user@mail.ru`,
  name: `User Name`,
  avatarUrl: `https://avatars.dicebear.com/api/human/1.svg`
};

describe(`Render Header`, () => {

  it(`Render Header (authorized/without breadcrumbs/with active user block)`, () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Route>
            <Header
              authorized={true}
              userInfo={userInfo}
              currentPage={AppPages.MAIN}
              breadcrumbsMovieId={-1}
              breadcrumbsMovieName={``}
            />
          </Route>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render Header (not authorized)`, () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Route>
            <Header
              authorized={false}
              userInfo={noAuthUserInfo}
              currentPage={AppPages.MAIN}
              breadcrumbsMovieId={-1}
              breadcrumbsMovieName={``}
            />
          </Route>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
