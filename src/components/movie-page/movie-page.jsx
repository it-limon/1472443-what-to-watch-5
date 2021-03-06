import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Props from "../../props";
import MovieTabs from "../movie-tabs/movie-tabs";
import MoviesList from "../movies-list/movies-list";
import {Link} from "react-router-dom";
import {getSimilarMovies} from "../../store/selectors/data-selector";
import Header from "../header/header";
import Footer from "../footer/footer";
import {AuthorizationStatus, AppPages, AppRoute} from "../../const";
import {getAuthorizationStatus} from "../../store/selectors/user-selector";
import {getLastActiveMovie, getIsPageNotFound} from "../../store/selectors/state-selector";
import {loadMoviePage} from "../../store/api-actions";
import PageNotFound from "../page-not-found/page-not-found";
import MyListButton from "../my-list-button/my-list-button";

const MoviePage = (props) => {
  const {newMovieId, movie, onLoadMoviePage, similarMovies, authorized, isPageNotFound} = props;

  useEffect(() => {
    onLoadMoviePage(newMovieId);
  }, [newMovieId]);

  if (!isPageNotFound && (movie.id === -1)) {
    return null;
  }

  return (
    <Fragment>
      {isPageNotFound ?
        <PageNotFound /> :
        <Fragment>
          <section className="movie-card movie-card--full" style={{backgroundColor: movie.backgroundColor}}>
            <div className="movie-card__hero">
              <div className="movie-card__bg">
                <img src={movie.backgroundImage} alt={movie.name} />
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header
                currentPage={AppPages.MOVIE}
              />

              <div className="movie-card__wrap">
                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{movie.name}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{movie.genre}</span>
                    <span className="movie-card__year">{movie.released}</span>
                  </p>

                  <div className="movie-card__buttons">
                    <Link to={`${AppRoute.PLAYER}/${movie.id}`} className="btn btn--play movie-card__button" type="button">
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </Link>

                    <MyListButton movie={movie} />
                    {authorized &&
                      <Link to={`${AppRoute.FILMS}/${movie.id}${AppRoute.REVIEW}`} className="btn movie-card__button">
                        Add review
                      </Link>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="movie-card__wrap movie-card__translate-top">
              <div className="movie-card__info">
                <div className="movie-card__poster movie-card__poster--big">
                  <img src={movie.posterImage} alt={`${movie.name} poster`} width="218" height="327" />
                </div>

                <div className="movie-card__desc">
                  <MovieTabs
                    movie={movie}
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="page-content">
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <MoviesList
                movies={similarMovies}
              />

            </section>

            <Footer
              currentPage={AppPages.MOVIE}
            />
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

MoviePage.propTypes = {
  newMovieId: PropTypes.number.isRequired,
  movie: Props.movie,
  similarMovies: PropTypes.arrayOf(Props.movie).isRequired,
  authorized: PropTypes.bool.isRequired,
  onLoadMoviePage: PropTypes.func.isRequired,
  isPageNotFound: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => ({
  newMovieId: parseInt(props.match.params.id, 10),
  movie: getLastActiveMovie(state),
  similarMovies: getSimilarMovies(state, props.match.params.id),
  authorized: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  isPageNotFound: getIsPageNotFound(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMoviePage(movieId) {
    dispatch(loadMoviePage(movieId));
  }
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
