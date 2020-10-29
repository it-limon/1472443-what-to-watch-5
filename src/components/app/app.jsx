import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page";
import AuthPage from "../auth-page/auth-page";
import MyListPage from "../my-list-page/my-list-page";
import MoviePage from "../movie-page/movie-page";
import ReviewPage from "../review-page/review-page";
import PlayerPage from "../player-page/player-page";
import Props from "../../props";

const App = (props) => {
  const {promoMovie, movies, reviews} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact
          path="/"
          render={({history}) => (
            <MainPage
              promoMovie={promoMovie}
              onActiveCardClick={() => history.push(`/films/0`)}
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
          render={({history}) => (
            <MoviePage
              movie={movies[0]}
              reviews={reviews}
              onActiveCardClick={() => history.push(`/films/0`)}
            />
          )}
        />
        <Route exact path="/films/:id/review">
          <ReviewPage movie={movies[0]} />
        </Route>
        <Route exact path="/player/:id">
          <PlayerPage movie={movies[0]} />
        </Route>
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
