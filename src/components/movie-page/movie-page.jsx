import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Props from "../../props";
import MovieTabs from "../movie-tabs/movie-tabs";
import MoviesList from "../movies-list/movies-list";
import {withActiveIndex} from "../../hocs/with-active-index/with-active-index";
import {Link} from "react-router-dom";
import {getSimilarMovies} from "../../store/selectors/data-selector";
import Header from "../header/header";
import Footer from "../footer/footer";
import {UNKNOWN_MOVIE_ID, AuthorizationStatus, AppPages, AppRoute} from "../../const";
import {getAuthorizationStatus} from "../../store/selectors/user-selector";
import {getLastActiveMovie} from "../../store/selectors/state-selector";
import {loadMoviePage} from "../../store/api-actions";
import LoaderPage from "../loader-page/loader-page";
import UnknownPage from "../unknown-page/unknown-page";
import MyListButton from "../my-list-button/my-list-button";

const MovieTabsWrapped = withActiveIndex(MovieTabs);

const MoviePage = (props) => {
  const {newMovieId, movie, onLoadMoviePage, similarMovies, authorized} = props;

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onLoadMoviePage(newMovieId, setIsLoading);
  }, [newMovieId]);

  return (
    <Fragment>
      {isLoading ?
        <LoaderPage /> :
        <Fragment>
          {movie.id === UNKNOWN_MOVIE_ID ?
            <UnknownPage /> :
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

                        {authorized ?
                          <Fragment>
                            <MyListButton movie={movie} />
                            <Link to={`${AppRoute.FILMS}/${movie.id}${AppRoute.REVIEW}`} className="btn movie-card__button">
                              Add review
                            </Link>
                          </Fragment> :
                          null
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
                      <MovieTabsWrapped
                        movie={movie} />
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
      }
    </Fragment>
  );
};

MoviePage.propTypes = {
  newMovieId: PropTypes.number.isRequired,
  movie: Props.movie,
  similarMovies: PropTypes.arrayOf(Props.movie).isRequired,
  authorized: PropTypes.bool.isRequired,
  onLoadMoviePage: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  newMovieId: parseInt(props.match.params.id, 10),
  movie: getLastActiveMovie(state),
  similarMovies: getSimilarMovies(state, props.match.params.id),
  authorized: getAuthorizationStatus(state) === AuthorizationStatus.AUTH
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMoviePage(movieId, setIsLoading) {
    dispatch(loadMoviePage(movieId, setIsLoading));
  }
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
