import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {StateActionCreator} from "../../store/actions/state-action";
import {getGenres} from "../../store/selectors/data-selector";
import {getCurrentGenre} from "../../store/selectors/state-selector";

const GenresList = (props) => {
  const {genres, currentGenre, onChangeMovieGenre} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, i) => (
        <li
          key={i}
          className={`catalog__genres-item${(genre === currentGenre) ? ` catalog__genres-item--active` : ``}`}
          onClick={() => {
            if (genre !== currentGenre) {
              onChangeMovieGenre(genre);
            }
          }}
        >
          <a href="#" className="catalog__genres-link" onClick={(evt) => evt.preventDefault()}>{genre}</a>
        </li>
      ))}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onChangeMovieGenre: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  genres: getGenres(state),
  currentGenre: getCurrentGenre(state)
});

const mapDispatchToProps = (dispatch) => ({
  onChangeMovieGenre(genre) {
    dispatch(StateActionCreator.changeMovieGenre(genre));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
