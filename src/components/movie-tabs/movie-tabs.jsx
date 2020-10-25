import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import {REVIEW_COLUMNS_COUNT} from "../../const";

const MovieTabs = (props) => {

  const tabs = [`Overview`, `Details`, `Reviews`];

  const _getReviewsPerColumns = (reviews) => {
    reviews = reviews.filter((review) => review.movieKey === props.movie.key);
    reviews.sort((a, b) => a.date - b.date);

    const reviewsCountInColumn = Math.ceil(reviews.length / REVIEW_COLUMNS_COUNT);
    const reviewsPerColumns = [];
    let j = 0;

    for (let i = 0; i < REVIEW_COLUMNS_COUNT; ++i) {
      const column = reviews.slice(j, j + reviewsCountInColumn);

      if (column.length > 0) {
        reviewsPerColumns[i] = column;
      } else {
        break;
      }

      j = j + reviewsCountInColumn;
    }

    return reviewsPerColumns;
  };

  const _getTabByActiveIndex = (index) => {
    const {genre, releaseYear, rating, ratingDesc, votesNumber, annotation, director, starring, runTime} = props.movie;
    let reviews = props.reviews;

    switch (index) {
      case 0:
        return (
          <Fragment>
            <div className="movie-rating">
              <div className="movie-rating__score">{rating}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{ratingDesc}</span>
                <span className="movie-rating__count">{`${votesNumber} ratings`}</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{annotation}</p>
              <p className="movie-card__director"><strong>{`Director: ${director}`}</strong></p>

              <p className="movie-card__starring"><strong>{`Starring: ${starring}`}</strong></p>
            </div>
          </Fragment>
        );
      case 1:
        return (
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  {starring}
                </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{runTime}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{releaseYear}</span>
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="movie-card__reviews movie-card__row">
            {_getReviewsPerColumns(reviews).map((colum, i) => (
              <div key={i} className="movie-card__reviews-col">
                {colum.map((review) => (
                  <div key={review.key} className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">{review.text}</p>

                      <footer className="review__details">
                        <cite className="review__author">{review.userName}</cite>
                        <time className="review__date" dateTime={`${review.date.getFullYear()}-${review.date.getMonth() + 1}-${review.date.getDate()}`}>
                          {review.date.toLocaleDateString(`en-US`, {year: `numeric`, month: `long`, day: `numeric`})}
                        </time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{review.rating}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      default: return null;
    }
  };

  const {activeIndex, onChangeActiveIndex} = props;

  return (
    <Fragment>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {tabs.map((tab, i) => (
            <li key={i} className={`movie-nav__item ${(i === activeIndex) ? `movie-nav__item--active` : ``}`}>
              <a
                href="#"
                className="movie-nav__link"
                onClick={(evt) => {
                  evt.preventDefault();
                  onChangeActiveIndex(i);
                }}
              >{tab}</a>
            </li>
          ))}
        </ul>
      </nav>
      {_getTabByActiveIndex(activeIndex)}
    </Fragment>
  );
};

MovieTabs.propTypes = {
  movie: Props.movie,
  activeIndex: PropTypes.number.isRequired,
  onChangeActiveIndex: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(Props.review).isRequired
};

export default MovieTabs;
