import React, {PureComponent} from "react";
import {DEFAULT_REVIEW_RATING} from "../../const";

export const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        reviewText: ``,
        rating: DEFAULT_REVIEW_RATING
      };

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
        <Component
          {...this.props}
          reviewText={this.state.reviewText}
          rating={parseInt(this.state.rating, 10)}
          onSubmit={this._handleSubmit}
          reviewChange={this._handleReviewChange}
        />
      );
    }
  }

  return WithReview;
};
