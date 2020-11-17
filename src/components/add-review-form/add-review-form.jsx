import React, {Fragment} from "react";
import PropTypes from "prop-types";

const AddReviewForm = (props) => {
  const {movieId, rating, onSubmit, commentChange, ratingChange, commentIsDisabled, ratingIsDisabled, btnPostIsDisabled, errorMessage} = props;
  const ratings = Array(5).fill(1).map((_it, i) => i + 1);

  return (
    <form action="#" className="add-review__form" onSubmit={(evt) => onSubmit(evt, movieId)}>
      <div className="rating">
        <div className="rating__stars">
          {ratings.map((it) => (
            <Fragment key={it}>
              <input className="rating__input" id={`star-${it}`} type="radio" name="rating" value={it} onChange={ratingChange} checked={rating === it} disabled={ratingIsDisabled}/>
              <label className="rating__label" htmlFor={`star-${it}`}>{`Rating ${it}`}</label>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="commentText" id="review-text" placeholder="Review text" onChange={commentChange} disabled={commentIsDisabled}></textarea>
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
  rating: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  commentChange: PropTypes.func.isRequired,
  ratingChange: PropTypes.func.isRequired,
  commentIsDisabled: PropTypes.bool.isRequired,
  ratingIsDisabled: PropTypes.bool.isRequired,
  btnPostIsDisabled: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default AddReviewForm;
