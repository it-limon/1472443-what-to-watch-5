import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import {connect} from "react-redux";
import {AppPages} from "../../const";
import Header from "../header/header";
import Footer from "../footer/footer";
import MoviesList from "../movies-list/movies-list";
import {loadFavoriteMoviesList} from "../../store/api-actions";
import {getFavoriteMovies} from "../../store/selectors/data-selector";

const MyListPage = (props) => {
  const {favoriteMovies, onLoadFavoriteMoviesList} = props;

  useEffect(() => {
    onLoadFavoriteMoviesList();
  }, []);

  return (
    <div className="user-page">
      <Header
        currentPage={AppPages.MYLIST}
      />

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesList
          movies={favoriteMovies}
        />
      </section>

      <Footer
        currentPage={AppPages.MYLIST}
      />
    </div>
  );
};

MyListPage.propTypes = {
  onLoadFavoriteMoviesList: PropTypes.func.isRequired,
  favoriteMovies: PropTypes.arrayOf(Props.movie).isRequired
};

const mapStateToProps = (state) => ({
  favoriteMovies: getFavoriteMovies(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFavoriteMoviesList() {
    dispatch(loadFavoriteMoviesList());
  }
});

export {MyListPage};
export default connect(mapStateToProps, mapDispatchToProps)(MyListPage);
