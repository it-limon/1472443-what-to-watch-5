import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Props from "../../props";
import MovieTabs from "../movie-tabs/movie-tabs";
import CatalogMoviesList from "../catalog-movies-list/catalog-movies-list";
import {withActiveIndex} from "../../hocs/with-active-index/with-active-index";
import {getGenreNameByKey, getReviewsByMovie} from "../../utils";
import {DEFAULT_LIKE_MOVIES_COUNT} from "../../const";
import {getMovieByKey} from "../../utils";
import {Link} from "react-router-dom";

const MovieTabsWrapped = withActiveIndex(MovieTabs);

const MoviePage = (props) => {
  const {movie, filteredMovies, reviews} = props;

  return (
    <Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{getGenreNameByKey(movie.genreKey)}</span>
                <span className="movie-card__year">{movie.releaseYear}</span>
              </p>

              <div className="movie-card__buttons">
                <Link to={`/player/${movie.key}`} className="btn btn--play movie-card__button" type="button">
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
              <img src={movie.img} alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <MovieTabsWrapped
                movie={movie}
                reviews={reviews}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <CatalogMoviesList
            movies={filteredMovies.filter((currMovie) => (currMovie.key !== movie.key) && (currMovie.genreKey === movie.genreKey)).slice(0, DEFAULT_LIKE_MOVIES_COUNT)}
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
  );
};

MoviePage.propTypes = {
  movie: Props.movie,
  filteredMovies: PropTypes.arrayOf(Props.movie).isRequired,
  reviews: PropTypes.arrayOf(Props.review).isRequired
};

const mapStateToProps = (state, props) => ({
  movie: getMovieByKey(state.filteredMovies, parseInt(props.match.params.id, 10)),
  filteredMovies: state.filteredMovies,
  reviews: getReviewsByMovie(state.reviews, parseInt(props.match.params.id, 10)).sort((it1, it2) => it1.date - it2.date)
});

export {MoviePage};
export default connect(mapStateToProps)(MoviePage);
