import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import VideoPlayer from "../video-player/video-player";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);

    this.timer = null;
  }

  _handleMouseEnter() {
    this.timer = setTimeout(() => this.props.onChangeActiveState(true), 1000);
  }

  _handleMouseLeave() {
    clearTimeout(this.timer);
    this.props.onChangeActiveState(false);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {movie, isActive: isPlaying, onActiveCardClick} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
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
            onClick={(evt) => {
              evt.preventDefault();
            }}
          >
            {movie.name}
          </a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  movie: Props.movie,
  isActive: PropTypes.bool.isRequired,
  onActiveCardClick: PropTypes.func.isRequired,
  onChangeActiveState: PropTypes.func.isRequired
};

export default SmallMovieCard;
