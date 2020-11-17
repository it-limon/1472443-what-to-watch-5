import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DEFAULT_REVIEW_RATING, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH} from "../../const";
import {sendComment} from "../../store/api-actions";

export const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        commentText: ``,
        rating: DEFAULT_REVIEW_RATING,
        commentIsDisabled: false,
        ratingIsDisabled: false,
        btnPostIsDisabled: true,
        errorMessage: ``
      };

      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleDisableUI = this._handleDisableUI.bind(this);
      this._handleSetErrorMsg = this._handleSetErrorMsg.bind(this);
    }

    _handleSubmit(evt, movieId) {
      evt.preventDefault();

      this.setState({error: ``});
      this._handleDisableUI(true);

      const {onSendComment} = this.props;
      const {rating, commentText} = this.state;

      onSendComment(movieId, {movieRating: rating, movieComment: commentText}, this._handleSetErrorMsg);
    }

    _handleDisableUI(disabled) {
      this.setState({
        commentIsDisabled: disabled,
        ratingIsDisabled: disabled,
        btnPostIsDisabled: disabled
      });
    }

    _handleSetErrorMsg(errMsg) {
      this.setState({errorMessage: errMsg});
      this._handleDisableUI(false);
    }

    _handleCommentChange(evt) {
      const {value} = evt.target;

      this.setState({
        btnPostIsDisabled: value.length < MIN_COMMENT_LENGTH || value.length > MAX_COMMENT_LENGTH,
        commentText: value
      });
    }

    _handleRatingChange(evt) {
      const {value} = evt.target;
      this.setState({rating: value});
    }

    render() {
      return (
        <Component
          {...this.props}
          rating={parseInt(this.state.rating, 10)}
          onSubmit={this._handleSubmit}
          commentChange={this._handleCommentChange}
          ratingChange={this._handleRatingChange}
          btnPostIsDisabled={this.state.btnPostIsDisabled}
          commentIsDisabled={this.state.commentIsDisabled}
          ratingIsDisabled={this.state.ratingIsDisabled}
          errorMessage={this.state.errorMessage}
        />
      );
    }
  }

  WithReview.propTypes = {
    onSendComment: PropTypes.func.isRequired
  };

  return connect(null, mapDispatchToProps)(WithReview);
};

const mapDispatchToProps = (dispatch) => ({
  onSendComment(movieId, comment, handleError) {
    dispatch(sendComment(movieId, comment, handleError));
  }
});
