import React, {Fragment, useState} from "react";
import PropTypes from "prop-types";
import {DEFAULT_REVIEW_RATING, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH} from "../../const";
import {connect} from "react-redux";
import {sendComment} from "../../store/api-actions";

const AddReviewForm = (props) => {
  const {movieId, onSendComment} = props;

  const ratings = Array(5).fill(1).map((_it, i) => i + 1);

  const [commentText, setCommentText] = useState(``);
  const [errorMessage, setErrorMessage] = useState(``);
  const [rating, setRating] = useState(DEFAULT_REVIEW_RATING);
  const [commentIsDisabled, setCommentIsDisabled] = useState(false);
  const [ratingIsDisabled, setRatingIsDisabled] = useState(false);
  const [btnPostIsDisabled, setBtnPostIsDisabled] = useState(false);

  const _handleSubmit = (evt) => {
    evt.preventDefault();

    setErrorMessage(``);
    _handleDisableUI(true);

    onSendComment(movieId, {movieRating: rating, movieComment: commentText}, _handleSetErrorMsg);
  };

  const _handleCommentChange = (evt) => {
    const {value} = evt.target;

    setBtnPostIsDisabled(value.length < MIN_COMMENT_LENGTH || value.length > MAX_COMMENT_LENGTH);
    setCommentText(value);
  };

  const _handleRatingChange = (evt) => {
    setRating(parseInt(evt.target.value, 10));
  };

  const _handleDisableUI = (disabled) => {
    setCommentIsDisabled(disabled);
    setRatingIsDisabled(disabled);
    setBtnPostIsDisabled(disabled);
  };

  const _handleSetErrorMsg = (errMsg) => {
    setErrorMessage(errMsg);
    _handleDisableUI(false);
  };

  return (
    <form action="#" className="add-review__form" onSubmit={_handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {ratings.map((it) => (
            <Fragment key={it}>
              <input className="rating__input" id={`star-${it}`} type="radio" name="rating" value={it} onChange={_handleRatingChange} checked={rating === it} disabled={ratingIsDisabled}/>
              <label className="rating__label" htmlFor={`star-${it}`}>{`Rating ${it}`}</label>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="commentText" id="review-text" placeholder="Review text" onChange={_handleCommentChange} disabled={commentIsDisabled}></textarea>
        <div className="add-review__submit">
          {errorMessage ? <div style={{width: `100%`}}><p style={{color: `red`}}>{errorMessage}</p></div> : null}
          <button className="add-review__btn" type="submit" disabled={btnPostIsDisabled}>Post</button>
        </div>
      </div>
    </form>
  );
};

AddReviewForm.propTypes = {
  movieId: PropTypes.number.isRequired,
  onSendComment: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onSendComment(movieId, comment, handleError) {
    dispatch(sendComment(movieId, comment, handleError));
  }
});

export {AddReviewForm};
export default connect(null, mapDispatchToProps)(AddReviewForm);
