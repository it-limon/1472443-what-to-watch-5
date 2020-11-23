import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Props from "../../props";
import {getShownMoviesByGenre} from "../../store/selectors/state-selector";

import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";
import ShowMoreButton from "../show-more-button/show-more-button";

const Catalog = (props) => {
  const {movies} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenresList />

      <MoviesList
        movies={movies}
      />

      <ShowMoreButton />
    </section>
  );
};

Catalog.propTypes = {
  movies: PropTypes.arrayOf(Props.movie).isRequired
};

const mapStateToProps = (state) => ({
  movies: getShownMoviesByGenre(state)
});

export {Catalog};
export default connect(mapStateToProps)(Catalog);
