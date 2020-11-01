import React from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import Player from "../video-player/video-player";
import {withPreviewVideo} from "../../hocs/with-preview-video/with-preview-video";
import history from "../../browser-history";

const PreviewVideoPlayer = withPreviewVideo(Player);

const SmallMovieCard = (props) => {
  const {movie, isActive: isPlaying, onChangeActiveState} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onChangeActiveState(!isPlaying)}
      onMouseLeave={() => onChangeActiveState(!isPlaying)}
      onClick={() => history.push(`/films/${movie.key}`)}
    >
      <div className="small-movie-card__image">
        <PreviewVideoPlayer
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
};

SmallMovieCard.propTypes = {
  movie: Props.movie,
  isActive: PropTypes.bool.isRequired,
  onChangeActiveState: PropTypes.func.isRequired
};

export default SmallMovieCard;
