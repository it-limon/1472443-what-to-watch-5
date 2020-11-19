import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import VideoPlayer from "../video-player/video-player";
import {connect} from "react-redux";
import {getLastActiveMovie, getIsPageNotFound} from "../../store/selectors/state-selector";
import PageNotFound from "../page-not-found/page-not-found";
import LoaderPage from "../loader-page/loader-page";

const PlayerPage = (props) => {
  const {
    movie,
    isLoading,
    isPlaying,
    elapsedTimePrc,
    timeLeft,
    videoRef,
    onPlaybackStatusChange,
    onExitButtonClick,
    onFullScreenButtonClick,
    isPageNotFound
  } = props;

  return (
    <Fragment>
      {isLoading ?
        <LoaderPage /> :
        <Fragment>
          {isPageNotFound ?
            <PageNotFound /> :
            <div className="player">
              <VideoPlayer
                videoRef={videoRef}
                src={movie.videoLink}
                poster={movie.previewImage}
                isPlaying={isPlaying}
              />
              <button type="button" className="player__exit" onClick={onExitButtonClick}>Exit</button>

              <div className="player__controls">
                <div className="player__controls-row">
                  <div className="player__time">
                    <progress className="player__progress" value={`${elapsedTimePrc}`} max="100"></progress>
                    <div className="player__toggler" style={{left: `${elapsedTimePrc}%`}}>Toggler</div>
                  </div>
                  <div className="player__time-value">{timeLeft}</div>
                </div>

                <div className="player__controls-row">
                  <button
                    type="button"
                    className="player__play"
                    onClick={onPlaybackStatusChange}
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

                  <button type="button" className="player__full-screen" onClick={onFullScreenButtonClick}>
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
      }
    </Fragment>
  );
};

PlayerPage.propTypes = {
  movie: Props.movie,
  videoRef: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  elapsedTimePrc: PropTypes.number.isRequired,
  timeLeft: PropTypes.string.isRequired,
  onPlaybackStatusChange: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isPageNotFound: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  movie: getLastActiveMovie(state),
  isPageNotFound: getIsPageNotFound(state)
});

export {PlayerPage};
export default connect(mapStateToProps)(PlayerPage);
