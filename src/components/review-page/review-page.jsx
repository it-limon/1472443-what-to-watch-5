import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import AddReviewForm from "../add-review-form/add-review-form";
import {withReview} from "../../hocs/with-review/with-review";
import {connect} from "react-redux";
import {loadMovie} from "../../store/api-actions";
import Header from "../header/header";
import {UNKNOWN_MOVIE_ID, AppPages} from "../../const";
import LoaderPage from "../loader-page/loader-page";
import {getLastActiveMovie} from "../../store/selectors/state-selector";
import UnknownPage from "../unknown-page/unknown-page";

const AddReviewFormWrapped = withReview(AddReviewForm);

const ReviewPage = (props) => {
  const {newMovieId, movie, onLoadMovie} = props;

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onLoadMovie(newMovieId, setIsLoading);
  }, []);

  return (
    <Fragment>
      {isLoading ?
        <LoaderPage /> :
        <Fragment>
          {movie.id === UNKNOWN_MOVIE_ID ?
            <UnknownPage /> :
            <section className="movie-card movie-card--full" style={{backgroundColor: movie.backgroundColor}}>
              <div className="movie-card__header">
                <div className="movie-card__bg">
                  <img src={movie.backgroundImage} alt={movie.name} />
                </div>

                <h1 className="visually-hidden">WTW</h1>

                <Header
                  currentPage={AppPages.REVIEW}
                  breadcrumbsMovieId={movie.id}
                  breadcrumbsMovieName={movie.name}
                />

                <div className="movie-card__poster movie-card__poster--small">
                  <img src={movie.posterImage} alt={`${movie.name} poster`} width="218" height="327" />
                </div>
              </div>

              <div className="add-review">
                <AddReviewFormWrapped
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

ReviewPage.propTypes = {
  newMovieId: PropTypes.number.isRequired,
  movie: Props.movie,
  onLoadMovie: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  newMovieId: parseInt(props.match.params.id, 10),
  movie: getLastActiveMovie(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMovie(movieId, setIsLoading) {
    dispatch(loadMovie(movieId, setIsLoading));
  }
});

export {ReviewPage};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);
