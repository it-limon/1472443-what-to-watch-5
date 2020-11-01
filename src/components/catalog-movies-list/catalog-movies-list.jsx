import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Props from "../../props";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import {withActiveState} from "../../hocs/with-active-state/with-active-state";

const SmallMovieCardWrapped = withActiveState(SmallMovieCard);

const CatalogMoviesList = (props) => {
  const {movies, shownMoviesCount} = props;

  return (
    <div className="catalog__movies-list">
      {movies.slice(0, shownMoviesCount).map((movie) => (
        <SmallMovieCardWrapped
          key={movie.key}
          movie={movie}
        />
      ))}
    </div>
  );
};

CatalogMoviesList.propTypes = {
  movies: PropTypes.arrayOf(Props.movie).isRequired,
  shownMoviesCount: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  shownMoviesCount: state.shownMoviesCount
});

export {CatalogMoviesList};
export default connect(mapStateToProps)(CatalogMoviesList);
