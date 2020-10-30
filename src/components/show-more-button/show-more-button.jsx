import React from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";

const ShowMoreButton = (props) => {
  const {filteredMovies, shownMoviesCount, onIncreaseShownMoviesCount} = props;

  return (
    <div className="catalog__more">
      {(shownMoviesCount < filteredMovies.length) &&
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
  filteredMovies: PropTypes.arrayOf(Props.movie).isRequired,
  shownMoviesCount: PropTypes.number.isRequired,
  onIncreaseShownMoviesCount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  filteredMovies: state.filteredMovies,
  shownMoviesCount: state.shownMoviesCount
});

const mapDispatchToProps = (dispatch) => ({
  onIncreaseShownMoviesCount() {
    dispatch(ActionCreator.increaseShownMoviesCount());
  }
});

export {ShowMoreButton};
export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreButton);
