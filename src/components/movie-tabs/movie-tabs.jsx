import React, {Fragment, useState} from "react";
import Props from "../../props";
import {getRatingName, getTimeFromMins} from "../../utils";
import MovieReviews from "../movie-reviews/movie-reviews";

const MovieTabs = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const _getTabByActiveIndex = (index) => {
    const {genre, released, rating, scoresCount, description, director, starring, runTime} = props.movie;

    switch (index) {
      case 0:
        return (
          <Fragment>
            <div className="movie-rating">
              <div className="movie-rating__score">{rating.toFixed(1)}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{getRatingName(rating)}</span>
                <span className="movie-rating__count">{`${scoresCount} ratings`}</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{description}</p>
              <p className="movie-card__director"><strong>{`Director: ${director}`}</strong></p>

              <p className="movie-card__starring"><strong>{`Starring: ${starring.join(`, `)}`}</strong></p>
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
                <span className="movie-card__details-value">{starring.join(`, `)}</span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{getTimeFromMins(runTime)}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{released}</span>
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <MovieReviews movie={props.movie}/>
        );
      default: return null;
    }
  };

  const movieTabs = [`Overview`, `Details`, `Reviews`];

  return (
    <Fragment>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {movieTabs.map((tab, i) => (
            <li key={i} className={`movie-nav__item ${(i === activeIndex) ? `movie-nav__item--active` : ``}`}>
              <a
                href="#"
                className="movie-nav__link"
                onClick={(evt) => {
                  evt.preventDefault();
                  setActiveIndex(i);
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
  movie: Props.movie
};

export default MovieTabs;
