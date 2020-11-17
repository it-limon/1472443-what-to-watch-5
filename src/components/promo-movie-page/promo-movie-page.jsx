import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Props from "../../props";
import Header from "../header/header";
import {AuthorizationStatus, AppPages} from "../../const";
import {getAuthorizationStatus} from "../../store/selectors/user-selector";
import {getPromoMovie} from "../../store/selectors/data-selector";

const PromoMoviePage = (props) => {
  const {promoMovie, authorized} = props;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={promoMovie.backgroundImage} alt={promoMovie.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header
        currentPage={AppPages.MAIN}
      />

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={promoMovie.posterImage} alt={`${promoMovie.name} poster`} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoMovie.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoMovie.genre}</span>
              <span className="movie-card__year">{promoMovie.released}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PromoMoviePage.propTypes = {
  promoMovie: Props.movie,
  authorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
  authorized: getAuthorizationStatus(state) === AuthorizationStatus.AUTH
});

//const mapDispatchToProps = (dispatch) => ({
  //onLoadCommentsList(movieId, setIsLoading) {
  //  dispatch(loadCommentsList(movieId, setIsLoading));
  //}
//});

export {PromoMoviePage};
export default connect(mapStateToProps)(PromoMoviePage);
