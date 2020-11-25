import React from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import SmallMovieCard from "../small-movie-card/small-movie-card";

const MoviesList = (props) => {
  const {movies} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => (
        <SmallMovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(Props.movie).isRequired
};

export default MoviesList;
