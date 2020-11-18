import React from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import {withActiveState} from "../../hocs/with-active-state/with-active-state";

const SmallMovieCardWrapped = withActiveState(SmallMovieCard);

const MoviesList = (props) => {
  const {movies} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => (
        <SmallMovieCardWrapped
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
