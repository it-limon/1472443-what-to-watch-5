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
import {connect} from "react-redux";
import LoaderPage from "../loader-page/loader-page";
import {getLoadingStatus} from "../../store/reducers/app-state/selector";

const PlayerPage = withMovieVideo(Player);

const App = (props) => {
  const {isLoading} = props;

  return (
    <Fragment>
      {!isLoading
        ?
        <BrowserRouter history={history}>
          <Switch>
            <Route exact
              path="/"
              render={({routeProps}) => (
                <MainPage
                  {...routeProps}
                />
              )}
            />
            <Route exact path="/login">
              <AuthPage />
            </Route>
            <Route exact
              path="/mylist"
              render={(routeProps) =>
                <MyListPage
                  {...routeProps}
                />
              }
            />
            <Route exact
              path="/films/:id"
              render={(routeProps) =>
                <MoviePage
                  {...routeProps}
                />
              }
            />
            <Route exact
              path="/films/:id/review"
              render={(routeProps) =>
                <ReviewPage
                  {...routeProps}
                />
              }
            />
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
        :
        <LoaderPage />
      }
    </Fragment>
  );
};

App.propTypes = {
  reviews: PropTypes.arrayOf(Props.review).isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isLoading: getLoadingStatus(state)
});

export {App};
export default connect(mapStateToProps)(App);
