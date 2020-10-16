import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import MainPage from "../main-page/main-page";
import AuthPage from "../auth-page/auth-page";
import MyListPage from "../my-list-page/my-list-page";
import MoviePage from "../movie-page/movie-page";
import ReviewPage from "../review-page/review-page";
import PlayerPage from "../player-page/player-page";
import Props from "../../props";

const App = (props) => {
  const {promoMovie, movies} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <MainPage
            promoMovie={promoMovie}
            movies={movies}
          />
        </Route>
        <Route path="/login" exact>
          <AuthPage />
        </Route>
        <Route path="/mylist" exact>
          <MyListPage movie={movies[0]} />
        </Route>
        <Route path="/films/:id" exact>
          <MoviePage movie={movies[0]} />
        </Route>
        <Route path="/films/:id/review" exact component={ReviewPage} />
        <Route path="/player/:id" exact>
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
  promoMovie: Props.promoMovie
};

export default App;
