import React, {Fragment} from "react";
import {Route, Router as BrowserRouter, Switch, Link} from "react-router-dom";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page";
import AuthPage from "../auth-page/auth-page";
import MyListPage from "../my-list-page/my-list-page";
import MoviePage from "../movie-page/movie-page";
import ReviewPage from "../review-page/review-page";
import Player from "../player-page/player-page";
import Props from "../../props";
import {withMovieVideo} from "../../hocs/with-movie-video/with-movie-video";
import history from "../../browser-history";

const PlayerPage = withMovieVideo(Player);

const App = (props) => {
  const {promoMovie, movies} = props;

  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact
          path="/"
          render={({routeProps}) => (
            <MainPage
              promoMovie={promoMovie}
              {...routeProps}
            />
          )}
        />
        <Route exact path="/login">
          <AuthPage />
        </Route>
        <Route exact path="/mylist">
          <MyListPage movies={movies} />
        </Route>
        <Route exact
          path="/films/:id"
          render={(routeProps) =>
            <MoviePage
              {...routeProps}
            />
          }
        />
        <Route exact path="/films/:id/review">
          <ReviewPage movie={movies[0]} />
        </Route>
        <Route exact
          path="/player/:id"
          render={(routeProps) =>
            <PlayerPage
              {...routeProps}
            />
          }
        />
        <Route
          render={() => (
            <Fragment>
              <h1>
                404.
                <br />
                <small>Page not found</small>
              </h1>
              <Link to="/">Go to main page</Link>
            </Fragment>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  promoMovie: Props.promoMovie,
  movies: PropTypes.arrayOf(Props.movie).isRequired,
  reviews: PropTypes.arrayOf(Props.review).isRequired
};

export default App;
