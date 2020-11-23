import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import MainPage from "./main-page";
import {Provider} from "react-redux";
import {Route, BrowserRouter} from "react-router-dom";
import {APIRoute, AuthorizationStatus} from "../../const";
import {testMovie} from "../../test-dataset/test-movie";
import {testMovies} from "../../test-dataset/test-movies";
import {testUser} from "../../test-dataset/test-user";
import MockAdapter from "axios-mock-adapter";
import {loadMainPage} from "../../store/api-actions";
import {createAPI} from "../../services/api";
import thunk from "redux-thunk";
import {applyMiddleware} from "redux";

let mockStore = null;
let store = null;

const noop = () => {};

const api = createAPI(() => {});

const apiMock = new MockAdapter(api);
const dispatch = jest.fn();
const mainPageLoader = loadMainPage(noop);

apiMock
  .onGet(APIRoute.PROMO_MOVIE)
  .reply(200, [{fake: true}]);

describe(`Render MainPage`, () => {
  
  it(`Render MainPage loaded`, () => {
    mockStore = configureStore({middlewares: thunk.withExtraArgument(api)});
    store = mockStore({
      DATA: {
        movies: testMovies,
        promoMovie: testMovie
      },
      STATE: {
        lastActiveMovie: testMovie,
        isPageNotFound: false,
        currentGenre: `All genres`,
        shownMoviesCount: 2
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: testUser
      }
    });

    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Route>
            <MainPage
              withLoader={false}
              onLoadMainPage={mainPageLoader}
            />
          </Route>
        </BrowserRouter>
      </Provider>
    ).toJSON();

    return mainPageLoader(dispatch, () => {}, api)
      .then(() => expect(tree).toMatchSnapshot());
  });

  it(`Render MainPage not found`, () => {
    mockStore = configureStore({middlewares: thunk.withExtraArgument(api)});
    store = mockStore({
      DATA: {
        movies: testMovies,
        promoMovie: testMovie
      },
      STATE: {
        lastActiveMovie: testMovie,
        isPageNotFound: true,
        currentGenre: `All genres`,
        shownMoviesCount: 2
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: testUser
      }
    });

    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Route>
            <MainPage
              withLoader={false}
              onLoadMainPage={mainPageLoader}
            />
          </Route>
        </BrowserRouter>
      </Provider>
    ).toJSON();

    return mainPageLoader(dispatch, () => {}, api)
      .then(() => expect(tree).toMatchSnapshot());
  });
});
