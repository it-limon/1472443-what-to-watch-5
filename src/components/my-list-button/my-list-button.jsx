
import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Props from "../../props";
import {setFavoriteMovie} from "../../store/api-actions";
import {AuthorizationStatus, AppRoute} from "../../const";
import {getAuthorizationStatus} from "../../store/selectors/user-selector";
import history from "../../browser-history";

const MyListButton = (props) => {
  const {movie, onSetFavoriteMovie, authorized} = props;

  const handleSetFavoriteMovie = (movieId, status) => {
    if (authorized) {
      onSetFavoriteMovie(movieId, status);
    } else {
      history.push(AppRoute.LOGIN);
    }
  };

  return (
    <button className="btn btn--list movie-card__button" type="button" onClick={() => handleSetFavoriteMovie(movie.id, +!movie.isFavorite)}>
      {movie.isFavorite ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg> :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
      }
      <span>My list</span>
    </button>
  );
};

MyListButton.propTypes = {
  movie: Props.movie,
  onSetFavoriteMovie: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authorized: getAuthorizationStatus(state) === AuthorizationStatus.AUTH
});

const mapDispatchToProps = (dispatch) => ({
  onSetFavoriteMovie(movieId, status) {
    dispatch(setFavoriteMovie(movieId, status));
  }
});

export {MyListButton};
export default connect(mapStateToProps, mapDispatchToProps)(MyListButton);
