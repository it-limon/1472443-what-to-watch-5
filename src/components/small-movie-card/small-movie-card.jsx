import React from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import Player from "../video-player/video-player";
import {withVideo} from "../../hocs/with-video/with-video";

const VideoPlayer = withVideo(Player);

const SmallMovieCard = (props) => {
  const {movie, isActive: isPlaying, onChangeActiveState, onActiveCardClick} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onChangeActiveState(true);
      }}
      onMouseLeave={() => {
        onChangeActiveState(false);
      }}
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
};

SmallMovieCard.propTypes = {
  movie: Props.movie,
  isActive: PropTypes.bool.isRequired,
  onActiveCardClick: PropTypes.func.isRequired,
  onChangeActiveState: PropTypes.func.isRequired
};

export default SmallMovieCard;
