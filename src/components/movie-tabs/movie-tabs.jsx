import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import {getCommentsColumns, getRatingName, getTimeFromMins} from "../../utils";
import {connect} from "react-redux";
import {getComments} from "../../store/selectors/data-selector";

const MovieTabs = (props) => {

  const _getTabByActiveIndex = (index) => {
    const {genre, released, rating, scoresCount, description, director, starring, runTime} = props.movie;
    const comments = props.comments;

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
          <div className="movie-card__reviews movie-card__row">
            {getCommentsColumns(comments).map((colIt, i) => (
              <div key={i} className="movie-card__reviews-col">
                {colIt.map((it, j) => (
                  <div key={j} className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">{it.comment}</p>

                      <footer className="review__details">
                        <cite className="review__author">{it.user.name}</cite>
                        <time className="review__date" dateTime={it.date}>
                          {new Date(it.date).toLocaleDateString(`en-US`, {year: `numeric`, month: `long`, day: `numeric`})}
                        </time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{it.rating.toFixed(1)}</div>
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
  comments: PropTypes.arrayOf(Props.comment).isRequired,
  activeIndex: PropTypes.number.isRequired,
  onChangeActiveIndex: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comments: getComments(state),
});

export {MovieTabs};
export default connect(mapStateToProps)(MovieTabs);
