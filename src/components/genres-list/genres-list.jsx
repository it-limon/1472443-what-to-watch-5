import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import CatalogMoviesList from "../catalog-movies-list/catalog-movies-list";
import Props from "../../props";
import {ActionCreator} from "../../store/action";
import {getGenres} from "../../store/reducers/app-data/selector";
import {getMoviesByGenre, getGenre} from "../../store/reducers/app-state/selector";

const GenresList = (props) => {
  const {movies, genres, currentGenre, onChangeMovieGenre} = props;

  return (
    <Fragment>
      <ul className="catalog__genres-list">
        {genres.map((genre, i) => (
          <li
            key={i}
            className={`catalog__genres-item ${(genre === currentGenre) ? `catalog__genres-item--active` : ``}`}
            onClick={(evt) => {
              evt.preventDefault();
              if (genre !== currentGenre) {
                onChangeMovieGenre(genre);
              }
            }}
          >
            <a href="#" className="catalog__genres-link">{genre}</a>
          </li>
        ))}
      </ul>

      <CatalogMoviesList
        movies={movies}
      />
    </Fragment>
  );
};

GenresList.propTypes = {
  movies: PropTypes.arrayOf(Props.movie).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onChangeMovieGenre: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movies: getMoviesByGenre(state),
  genres: getGenres(state),
  currentGenre: getGenre(state)
});

const mapDispatchToProps = (dispatch) => ({
  onChangeMovieGenre(genre) {
    dispatch(ActionCreator.changeMovieGenre(genre));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
