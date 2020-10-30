import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import CatalogMoviesList from "../catalog-movies-list/catalog-movies-list";
import Props from "../../props";
import {ActionCreator} from "../../store/action";
import genres from "../../genres";

const GenresList = (props) => {
  const {filteredMovies, currentMovieGenreKey, onChangeMovieGenre, onActiveCardClick} = props;

  return (
    <Fragment>
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

      <CatalogMoviesList
        movies={filteredMovies}
        onActiveCardClick={onActiveCardClick}
      />
    </Fragment>
  );
};

GenresList.propTypes = {
  filteredMovies: PropTypes.arrayOf(Props.movie).isRequired,
  currentMovieGenreKey: PropTypes.number.isRequired,
  onChangeMovieGenre: PropTypes.func.isRequired,
  onActiveCardClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  filteredMovies: state.filteredMovies,
  currentMovieGenreKey: state.currentMovieGenreKey
});

const mapDispatchToProps = (dispatch) => ({
  onChangeMovieGenre(genreKey) {
    dispatch(ActionCreator.changeMovieGenre(genreKey));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
