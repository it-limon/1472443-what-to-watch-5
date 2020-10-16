import React from "react";

const SmallMovieCard = (props) => {
  const movie = props.movie;
  const onActiveMovieCardChange = props.onActiveMovieCardChange;

  return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseOver={(evt) => {
          evt.preventDefault();
          onActiveMovieCardChange(movie.id);
        }}
        onMouseLeave={(evt) => {
          evt.preventDefault();
          onActiveMovieCardChange(-1);
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
}

export default SmallMovieCard;
