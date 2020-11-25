import React, {useState} from "react";
import Props from "../../props";
import PreviewVideoPlayer from "../preview-video-player/preview-video-player";
import history from "../../browser-history";
import {AppRoute} from "../../const";

const SmallMovieCard = (props) => {
  const {movie} = props;

  const [isActive, setIsActive] = useState(false);

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => history.push(`${AppRoute.FILMS}/${movie.id}`)}
    >
      <div className="small-movie-card__image">
        <PreviewVideoPlayer
          src={movie.previewVideoLink}
          poster={movie.previewImage}
          isPlaying={isActive}
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
  movie: Props.movie
};

export default SmallMovieCard;
