import React from "react";

const SmallMovieCard = (props) => {
  const movies = props.movies;
  const onActiveMovieCardChange = props.onActiveMovieCardChange;

  return (
    <React.Fragment>
      {movies.map((movie) => (
        <article key={`${movie.id}`}
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
      ))}
    </React.Fragment>
  );
}

export default SmallMovieCard;