import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Props from "../../props";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import {withActiveState} from "../../hocs/with-active-state/with-active-state";
import {getShownMoviesCount} from "../../store/reducers/app-state/selector";

const SmallMovieCardWrapped = withActiveState(SmallMovieCard);

const CatalogMoviesList = (props) => {
  const {movies, shownMoviesCount} = props;

  return (
    <div className="catalog__movies-list">
      {movies.slice(0, shownMoviesCount).map((movie) => (
        <SmallMovieCardWrapped
          key={movie.id}
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
  shownMoviesCount: getShownMoviesCount(state)
});

export {CatalogMoviesList};
export default connect(mapStateToProps)(CatalogMoviesList);
