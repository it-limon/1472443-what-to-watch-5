import React from "react";
import PropTypes from "prop-types";
import Props from "../../props";

const SmallMovieCard = (props) => {
  const {movie, onActiveMovieCardChange, onSmallMovieCardClick} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={(evt) => {
        evt.preventDefault();
        onActiveMovieCardChange(movie.key);
      }}
      onMouseLeave={(evt) => {
        evt.preventDefault();
        onActiveMovieCardChange(-1);
      }}
      onClick={(evt) => {
        evt.preventDefault();
        onSmallMovieCardClick();
      }}
    >
      <div className="small-movie-card__image">
        <img src={movie.previewImg} alt={movie.name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{movie.name}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: Props.movie,
  onActiveMovieCardChange: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired
};

export default SmallMovieCard;
