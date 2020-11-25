import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import AddReviewForm from "../add-review-form/add-review-form";
import {connect} from "react-redux";
import {loadMovie} from "../../store/api-actions";
import Header from "../header/header";
import {AppPages} from "../../const";
import LoaderPage from "../loader-page/loader-page";
import {getLastActiveMovie, getIsPageNotFound} from "../../store/selectors/state-selector";
import PageNotFound from "../page-not-found/page-not-found";

const ReviewPage = (props) => {
  const {withLoader, newMovieId, movie, onLoadMovie, isPageNotFound} = props;

  const [isLoading, setIsLoading] = useState(withLoader);
  useEffect(() => {
    onLoadMovie(newMovieId, setIsLoading);
  }, []);

  return (
    <Fragment>
      {isLoading ?
        <LoaderPage /> :
        <Fragment>
          {isPageNotFound ?
            <PageNotFound /> :
            <section className="movie-card movie-card--full" style={{backgroundColor: movie.backgroundColor}}>
              <div className="movie-card__header">
                <div className="movie-card__bg">
                  <img src={movie.backgroundImage} alt={movie.name} />
                </div>

                <h1 className="visually-hidden">WTW</h1>

                <Header currentPage={AppPages.REVIEW} />

                <div className="movie-card__poster movie-card__poster--small">
                  <img src={movie.posterImage} alt={`${movie.name} poster`} width="218" height="327" />
                </div>
              </div>

              <div className="add-review">
                <AddReviewForm
                  movieId={movie.id}
                />
              </div>
            </section>
          }
        </Fragment>
      }
    </Fragment>
  );
};

ReviewPage.defaultProps = {
  withLoader: true
};

ReviewPage.propTypes = {
  newMovieId: PropTypes.number.isRequired,
  movie: Props.movie,
  onLoadMovie: PropTypes.func.isRequired,
  isPageNotFound: PropTypes.bool.isRequired,
  withLoader: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => ({
  newMovieId: parseInt(props.match.params.id, 10),
  movie: getLastActiveMovie(state),
  isPageNotFound: getIsPageNotFound(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMovie(movieId, setIsLoading) {
    dispatch(loadMovie(movieId, setIsLoading));
  }
});

export {ReviewPage};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);
