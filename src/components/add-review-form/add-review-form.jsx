import React, {Fragment} from "react";
import PropTypes from "prop-types";

const AddReviewForm = (props) => {
  const {reviewText, rating, onSubmit, reviewChange} = props;
  const ratings = [1, 2, 3, 4, 5];

  return (
    <form action="#" className="add-review__form" onSubmit={onSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {ratings.map((it) => (
            <Fragment key={it}>
              <input className="rating__input" id={`star-${it}`} type="radio" name="rating" value={it} onChange={reviewChange} checked={rating === it} />
              <label className="rating__label" htmlFor={`star-${it}`}>{`Rating ${it}`}</label>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="reviewText" id="review-text" placeholder="Review text" onChange={reviewChange} value={reviewText}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
};

AddReviewForm.propTypes = {
  reviewText: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reviewChange: PropTypes.func.isRequired
};

export default AddReviewForm;
