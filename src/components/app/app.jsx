import React from "react";
import {Route, Router as BrowserRouter, Switch} from "react-router-dom";
import MainPage from "../main-page/main-page";
import Auth from "../auth-page/auth-page";
import MyListPage from "../my-list-page/my-list-page";
import MoviePage from "../movie-page/movie-page";
import ReviewPage from "../review-page/review-page";
import Player from "../player-page/player-page";
import {withMovieVideo} from "../../hocs/with-movie-video/with-movie-video";
import history from "../../browser-history";
import {withAuth} from "../../hocs/with-auth/with-auth";
import PrivateRoute from "../private-route/private-route";
import {AppRoute} from "../../const";
import PageNotFound from "../page-not-found/page-not-found";

const PlayerPage = withMovieVideo(Player);
const AuthPage = withAuth(Auth);

const App = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact
          path={AppRoute.MAIN}
          render={(routeProps) => (
            <MainPage
              {...routeProps}
            />
          )}
        />
        <Route exact
          path={AppRoute.LOGIN}
          render={(routeProps) => (
            <AuthPage
              {...routeProps}
            />
          )}
        />
        <PrivateRoute exact
          path={AppRoute.MYLIST}
          render={(routeProps) =>
            <MyListPage
              {...routeProps}
            />
          }
        />
        <Route exact
          path={`${AppRoute.FILMS}/:id`}
          render={(routeProps) =>
            <MoviePage
              {...routeProps}
            />
          }
        />
        <PrivateRoute exact
          path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
          render={(routeProps) =>
            <ReviewPage
              {...routeProps}
            />
          }
        />
        <Route exact
          path={`${AppRoute.PLAYER}/:id`}
          render={(routeProps) =>
            <PlayerPage
              {...routeProps}
            />
          }
        />
        <Route
          render={() => (
            <PageNotFound />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
};

export default App;
