import React, {Fragment, useRef, useEffect, useState} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import PageNotFound from "../page-not-found/page-not-found";
import {connect} from "react-redux";
import {loadMovie} from "../../store/api-actions";
import history from "../../browser-history";
import {getLastActiveMovie, getIsPageNotFound} from "../../store/selectors/state-selector";

const PlayerPage = (props) => {
  const {movie, onLoadMovie, isPageNotFound} = props;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleSetIsLoading = () => {
    const video = videoRef.current;

    if (video !== null) {

      video.onloadedmetadata = () => setDuration(video.duration);
      video.ontimeupdate = () => setElapsedTime(Math.trunc(video.currentTime));
      video.play();
    }
  };

  useEffect(() => {
    const newMovieId = parseInt(props.match.params.id, 10);

    if (movie.id !== newMovieId) {
      onLoadMovie(newMovieId, handleSetIsLoading);
    }

    const video = videoRef.current;
    if (video !== null) {
      if (isPlaying) {
        if (Math.trunc(elapsedTime) === Math.trunc(duration) && duration !== 0) {
          video.load();
          handlePlaybackStatusChange();
        } else {
          handleSetIsLoading();
        }
      } else {
        video.onloadmetadate = null;
        video.ontimeupdate = null;
        video.pause();
      }

      return () => {
        video.onloadmetadate = null;
        video.ontimeupdate = null;
      };
    }

    return () => {};

  }, [isPlaying]);

  const handlePlaybackStatusChange = () => {
    setIsPlaying(!isPlaying);
  };

  const handleExitButtonClick = () => {
    history.goBack();
  };

  const handleFullScreenButtonClick = () => {
    const video = videoRef.current;
    video.requestFullscreen();
  };

  const getTimeLeft = () => {
    const difference = duration - elapsedTime;

    const seconds = Math.trunc(difference % 60);
    const hours = Math.trunc(difference / 60 / 60);
    const minutes = Math.trunc(difference / 60 - hours * 60);

    return hours + `:` + (`0` + minutes).slice(-2) + `:` + (`0` + seconds).slice(-2);
  };

  if (!isPageNotFound && (movie.id === -1)) {
    return null;
  }

  const elapsedTimePrc = Math.round(elapsedTime * 100 / duration);

  return (
    <Fragment>
      {isPageNotFound ?
        <PageNotFound /> :
        <div className="player">
          <video
            className="player__video"
            ref={videoRef}
            src={movie.videoLink}
            poster={movie.previewImage}
          />
          <button type="button" className="player__exit" onClick={handleExitButtonClick}>Exit</button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value={`${elapsedTimePrc}`} max="100"></progress>
                <div className="player__toggler" style={{left: `${elapsedTimePrc}%`}}>Toggler</div>
              </div>
              <div className="player__time-value">{getTimeLeft()}</div>
            </div>

            <div className="player__controls-row">
              <button
                type="button"
                className="player__play"
                onClick={handlePlaybackStatusChange}
              >
                {isPlaying
                  ?
                  <Fragment>
                    <svg viewBox="0 0 14 21" width="14" height="21">
                      <use xlinkHref="#pause"></use>
                    </svg>
                    <span>Pause</span>
                  </Fragment>
                  :
                  <Fragment>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Fragment>
                }
                <span>Play</span>
              </button>
              <div className="player__name">{movie.name}</div>

              <button type="button" className="player__full-screen" onClick={handleFullScreenButtonClick}>
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      }
    </Fragment>
  );
};

PlayerPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  movie: Props.movie,
  onLoadMovie: PropTypes.func.isRequired,
  isPageNotFound: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  movie: getLastActiveMovie(state),
  isPageNotFound: getIsPageNotFound(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMovie(movieId, handleSetIsLoading) {
    dispatch(loadMovie(movieId, handleSetIsLoading));
  }
});

export {PlayerPage};
export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
