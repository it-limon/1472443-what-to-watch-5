import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import Props from "../../props";
import {withActiveState} from "../../hocs/with-active-state/with-active-state";
import {connect} from "react-redux";
import {AppPages} from "../../const";
import Header from "../header/header";
import Footer from "../footer/footer";

const SmallMovieCardWrapped = withActiveState(SmallMovieCard);

const MyListPage = (props) => {
  const movies = props.movies;

  return (
    <div className="user-page">
      <Header
        currentPage={AppPages.MYLIST}
      />

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__movies-list">
          {movies.map((movie) => (
            <SmallMovieCardWrapped
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </section>

      <Footer
        currentPage={AppPages.MYLIST}
      />
    </div>
  );
};

MyListPage.propTypes = {
  movies: PropTypes.arrayOf(Props.movie).isRequired
};

const mapStateToProps = ({DATA}) => ({
  movies: DATA.movies
});

export {MyListPage};
export default connect(mapStateToProps)(MyListPage);
