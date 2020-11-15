import React, {Fragment, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Props from "../../props";
import MovieTabs from "../movie-tabs/movie-tabs";
import MoviesList from "../movies-list/movies-list";
import {withActiveIndex} from "../../hocs/with-active-index/with-active-index";
import {Link} from "react-router-dom";
import {getMovieById, getSimilarMovies} from "../../store/selectors/data-selector";
import LoaderPage from "../loader-page/loader-page";
import {loadCommentsList} from "../../store/api-actions";
import Header from "../header/header";

const MovieTabsWrapped = withActiveIndex(MovieTabs);

const MoviePage = (props) => {
  const {movie, similarMovies, onLoadCommentsList} = props;

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onLoadCommentsList(movie.id, setIsLoading);
  }, []);

  return (
    <Fragment>
      {isLoading ?
        <LoaderPage /> :
        <Fragment>
          <section className="movie-card movie-card--full" style={{backgroundColor: movie.backgroundColor}}>
            <div className="movie-card__hero">
              <div className="movie-card__bg">
                <img src={movie.backgroundImage} alt={movie.name} />
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header
                headerClassName={`movie-card__head`}
              />

              <div className="movie-card__wrap">
                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{movie.name}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{movie.genre}</span>
                    <span className="movie-card__year">{movie.released}</span>
                  </p>

                  <div className="movie-card__buttons">
                    <Link to={`/player/${movie.id}`} className="btn btn--play movie-card__button" type="button">
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </Link>

                    <button className="btn btn--list movie-card__button" type="button">
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                    <a href="add-review.html" className="btn movie-card__button">Add review</a>
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

            <footer className="page-footer">
              <div className="logo">
                <a href="main.html" className="logo__link logo__link--light">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <div className="copyright">
                <p>© 2019 What to watch Ltd.</p>
              </div>
            </footer>
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

MoviePage.propTypes = {
  movie: Props.movie,
  similarMovies: PropTypes.arrayOf(Props.movie).isRequired,
  onLoadCommentsList: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  movie: getMovieById(state, props.match.params.id),
  similarMovies: getSimilarMovies(state, props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadCommentsList(movieId, setIsLoading) {
    dispatch(loadCommentsList(movieId, setIsLoading));
  }
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
