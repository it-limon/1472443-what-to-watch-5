import React, {Fragment} from "react";
import {Route, Router as BrowserRouter, Switch, Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page";
import Auth from "../auth-page/auth-page";
import MyListPage from "../my-list-page/my-list-page";
import MoviePage from "../movie-page/movie-page";
import ReviewPage from "../review-page/review-page";
import Player from "../player-page/player-page";
import {withMovieVideo} from "../../hocs/with-movie-video/with-movie-video";
import history from "../../browser-history";
import {connect} from "react-redux";
import {withAuth} from "../../hocs/with-auth/with-auth";
import PrivateRoute from "../private-route/private-route";
import {AuthorizationStatus, LoadingStatus} from "../../const";
import {getAuthorizationStatus} from "../../store/selectors/user-selector";
import LoaderPage from "../loader-page/loader-page";
import {getLoadingStatus} from "../../store/selectors/state-selector";

const PlayerPage = withMovieVideo(Player);
const AuthPage = withAuth(Auth);

const App = (props) => {
  const {authorized, loaded} = props;

  return (
    <Fragment>
      {loaded ?
        <BrowserRouter history={history}>
          <Switch>
            <Route exact
              path="/"
              render={(routeProps) => (
                <MainPage
                  {...routeProps}
                />
              )}
            />
            <Route exact
              path="/login"
              render={(routeProps) => (
                <Fragment>
                  {authorized ?
                    <Redirect to="/" /> :
                    <AuthPage
                      {...routeProps}
                    />
                  }
                </Fragment>
              )}
            />
            <PrivateRoute exact
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
            <PrivateRoute exact
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
        </BrowserRouter> :
        <LoaderPage />
      }
    </Fragment>
  );
};

App.propTypes = {
  authorized: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  loaded: getLoadingStatus(state) === LoadingStatus.COMPLETED,
  authorized: getAuthorizationStatus(state) === AuthorizationStatus.AUTH
});

export {App};
export default connect(mapStateToProps)(App);
