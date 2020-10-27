import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import CatalogMoviesList from "../catalog-movies-list/catalog-movies-list";
import {MovieGenresList} from "../../const/movie-genres-list.const";

const GenresList = (props) => {
  const {filteredMovies, currentMovieGenreKey, onChangeMovieGenre, onActiveCardClick} = props;

  return (
    <Fragment>
      <ul className="catalog__genres-list">
        {MovieGenresList.sort((a, b) => a.ord - b.ord).map((genre) => (
          <li
            key={genre.key}
            className={`catalog__genres-item ${(genre.key === currentMovieGenreKey) ? `catalog__genres-item--active` : ``}`}
            onClick={(evt) => {
              evt.preventDefault();
              onChangeMovieGenre(genre.key);
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
  currentMovieGenreKey: state.currentMovieGenreKey,
  filteredMovies: state.filteredMovies
});

const mapDispatchToProps = (dispatch) => ({
  onChangeMovieGenre(genreKey) {
    dispatch(ActionCreator.changeMovieGenre(genreKey));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
