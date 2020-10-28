import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Props from "../../props";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import {withActiveState} from "../../hocs/with-active-state/with-active-state";
import {LIKE_THIS_MOVIE_COUNT} from "../../const";

const SmallMovieCardWrapped = withActiveState(SmallMovieCard);

const CatalogMoviesList = (props) => {
  const {movieKeyForLikeThis, shownMoviesCount, onActiveCardClick} = props;
  let movies = props.movies;

  if (movieKeyForLikeThis !== -1) {
    movies = movies.filter((currMovie) => currMovie.key !== movieKeyForLikeThis).slice(0, LIKE_THIS_MOVIE_COUNT);
  } else {
    movies = movies.slice(0, shownMoviesCount);
  }

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => (
        <SmallMovieCardWrapped
          key={movie.key}
          movie={movie}
          onActiveCardClick={onActiveCardClick}
        />
      ))}
    </div>
  );
};

CatalogMoviesList.defaultProps = {
  movieKeyForLikeThis: -1
};

CatalogMoviesList.propTypes = {
  movies: PropTypes.arrayOf(Props.movie).isRequired,
  movieKeyForLikeThis: PropTypes.number.isRequired,
  shownMoviesCount: PropTypes.number.isRequired,
  onActiveCardClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movies: state.filteredMovies,
  shownMoviesCount: state.shownMoviesCount
});

export {CatalogMoviesList};
export default connect(mapStateToProps)(CatalogMoviesList);
