import React, {PureComponent} from "react";

class AddReviewForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reviewText: ``,
      rating: 3
    }
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleReviewChange = this._handleReviewChange.bind(this);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
  }

  _handleReviewChange(evt) {
    const {name, value} = evt.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <form action="#" className="add-review__form" onSubmit={this._handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={this._handleReviewChange} />
            <label className="rating__label" htmlFor="star-1">Rating 1</label>

            <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={this._handleReviewChange} />
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={this._handleReviewChange} defaultChecked />
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={this._handleReviewChange} />
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={this._handleReviewChange} />
            <label className="rating__label" htmlFor="star-5">Rating 5</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="reviewText" id="review-text" placeholder="Review text" onChange={this._handleReviewChange}></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddReviewForm;
