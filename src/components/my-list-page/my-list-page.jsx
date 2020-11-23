import React, {Fragment, useEffect, useState} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import {connect} from "react-redux";
import {AppPages} from "../../const";
import Header from "../header/header";
import Footer from "../footer/footer";
import MoviesList from "../movies-list/movies-list";
import LoaderPage from "../loader-page/loader-page";
import {loadFavoriteMoviesList} from "../../store/api-actions";
import {getFavoriteMovies} from "../../store/selectors/data-selector";

const MyListPage = (props) => {
  const {withLoader, favoriteMovies, onLoadFavoriteMoviesList} = props;

  const [isLoading, setIsLoading] = useState(withLoader);
  useEffect(() => {
    onLoadFavoriteMoviesList(setIsLoading);
  }, []);

  return (
    <Fragment>
      {isLoading ?
        <LoaderPage /> :
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
      }
    </Fragment>
  );
};

MyListPage.defaultProps = {
  withLoader: true
};

MyListPage.propTypes = {
  withLoader: PropTypes.bool.isRequired,
  onLoadFavoriteMoviesList: PropTypes.func.isRequired,
  favoriteMovies: PropTypes.arrayOf(Props.movie).isRequired
};

const mapStateToProps = (state) => ({
  favoriteMovies: getFavoriteMovies(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFavoriteMoviesList(setIsLoading) {
    dispatch(loadFavoriteMoviesList(setIsLoading));
  }
});

export {MyListPage};
export default connect(mapStateToProps, mapDispatchToProps)(MyListPage);
