import React from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import {getMoviesByGenre} from "../../store/reducers/app-state/selector";
import {getShownMoviesCount} from "../../store/reducers/app-state/selector";

const ShowMoreButton = (props) => {
  const {movies, shownMoviesCount, onIncreaseShownMoviesCount} = props;

  return (
    <div className="catalog__more">
      {(shownMoviesCount < movies.length) &&
        <button
          className="catalog__button" type="button"
          onClick={onIncreaseShownMoviesCount}
        >
          Show more
        </button>
      }
    </div>
  );
};

ShowMoreButton.propTypes = {
  movies: PropTypes.arrayOf(Props.movie).isRequired,
  shownMoviesCount: PropTypes.number.isRequired,
  onIncreaseShownMoviesCount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movies: getMoviesByGenre(state),
  shownMoviesCount: getShownMoviesCount(state)
});

const mapDispatchToProps = (dispatch) => ({
  onIncreaseShownMoviesCount() {
    dispatch(ActionCreator.increaseShownMoviesCount());
  }
});

export {ShowMoreButton};
export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreButton);
