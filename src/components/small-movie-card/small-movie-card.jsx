import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import VideoPlayer from "../video-player/video-player";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };

    this._handleOnMouseEnter = this._handleOnMouseEnter.bind(this);
    this._handleOnMouseLeave = this._handleOnMouseLeave.bind(this);

    this.timer = null;
  }

  _handleOnMouseEnter() {
    this.timer = setTimeout(() => this.setState({isActive: true}), 1000);
  }

  _handleOnMouseLeave() {
    clearTimeout(this.timer);
    this.setState({isActive: false});
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {movie, onActiveCardClick} = this.props;
    const {isActive: isPlaying} = this.state;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleOnMouseEnter}
        onMouseLeave={this._handleOnMouseLeave}
        onClick={onActiveCardClick}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            src={movie.video}
            poster={movie.previewImg}
            isPlaying={isPlaying}
            isMuted={true}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a
            className="small-movie-card__link"
            href="#"
            onClick={onActiveCardClick}>
            {movie.name}
          </a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  movie: Props.movie,
  onActiveCardClick: PropTypes.func.isRequired
};

export default SmallMovieCard;
