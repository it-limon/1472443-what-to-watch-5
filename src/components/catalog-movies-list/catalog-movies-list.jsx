import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import Props from "../../props";

const CatalogMoviesList = (props) => {
  const {movies, onActiveCardClick} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => (
        <SmallMovieCard
          key={movie.key}
          movie={movie}
          onActiveCardClick={onActiveCardClick}
        />
      ))}
    </div>
  );
};

CatalogMoviesList.propTypes = {
  movies: PropTypes.arrayOf(Props.movie).isRequired,
  onActiveCardClick: PropTypes.func.isRequired
};

export default CatalogMoviesList;
