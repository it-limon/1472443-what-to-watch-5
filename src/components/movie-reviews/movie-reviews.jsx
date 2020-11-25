import React, {useEffect} from "react";
import {getCommentsColumns} from "../../utils";
import {connect} from "react-redux";
import {getComments} from "../../store/selectors/data-selector";
import {loadCommentsList} from "../../store/api-actions";
import PropTypes from "prop-types";
import Props from "../../props";

const MovieReviews = (props) => {
  const {movie, comments, onLoadCommentsList} = props;

  useEffect(() => {
    onLoadCommentsList(movie.id);
  }, []);

  return (
    <div className="movie-card__reviews movie-card__row">
      {getCommentsColumns(comments).map((colIt, i) => (
        <div key={i} className="movie-card__reviews-col">
          {colIt.map((it) => (
            <div key={it.id} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{it.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{it.user.name}</cite>
                  <time className="review__date" dateTime={it.date}>
                    {new Date(it.date).toLocaleDateString(`en-US`, {year: `numeric`, month: `long`, day: `numeric`})}
                  </time>
                </footer>
              </blockquote>

              <div className="review__rating">{it.rating.toFixed(1)}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

MovieReviews.propTypes = {
  movie: Props.movie,
  comments: PropTypes.arrayOf(Props.comment).isRequired,
  onLoadCommentsList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadCommentsList(movieId) {
    dispatch(loadCommentsList(movieId));
  }
});

export {MovieReviews};
export default connect(mapStateToProps, mapDispatchToProps)(MovieReviews);
