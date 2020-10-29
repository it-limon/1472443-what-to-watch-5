import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import genres from "../../genres";

const GenresList = (props) => {
  const {currentMovieGenreKey, onChangeMovieGenre} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.sort((a, b) => a.ord - b.ord).map((genre) => (
        <li
          key={genre.key}
          className={`catalog__genres-item ${(genre.key === currentMovieGenreKey) ? `catalog__genres-item--active` : ``}`}
          onClick={(evt) => {
            evt.preventDefault();
            if (genre.key !== currentMovieGenreKey) {
              onChangeMovieGenre(genre.key);
            }
          }}
        >
          <a href="#" className="catalog__genres-link">{genre.filterName}</a>
        </li>
      ))}
    </ul>
  );
};

GenresList.propTypes = {
  currentMovieGenreKey: PropTypes.number.isRequired,
  onChangeMovieGenre: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentMovieGenreKey: state.currentMovieGenreKey
});

const mapDispatchToProps = (dispatch) => ({
  onChangeMovieGenre(genreKey) {
    dispatch(ActionCreator.changeMovieGenre(genreKey));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
