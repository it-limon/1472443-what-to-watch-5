import React from "react";
import Props from "../../props";
import AddReviewForm from "../add-review-form/add-review-form";
import {withReview} from "../../hocs/with-review/with-review";
import {connect} from "react-redux";
import {getMovieById} from "../../store/selectors/data-selector";
import Header from "../header/header";
import {AppPages} from "../../const";

const AddReviewFormWrapped = withReview(AddReviewForm);

const ReviewPage = (props) => {
  const movie = props.movie;

  return (
    <section className="movie-card movie-card--full" style={{backgroundColor: movie.backgroundColor}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={movie.backgroundImage} alt={movie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          currentPage={AppPages.REVIEW}
          breadcrumbsMovieId={movie.id}
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
  );
};

ReviewPage.propTypes = {
  movie: Props.movie
};

const mapStateToProps = (state, props) => ({
  movie: getMovieById(state, parseInt(props.match.params.id, 10))
});

export {ReviewPage};
export default connect(mapStateToProps)(ReviewPage);
