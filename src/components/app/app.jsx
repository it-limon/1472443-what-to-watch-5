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
