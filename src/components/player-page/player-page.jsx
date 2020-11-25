import React, {Fragment, PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import PageNotFound from "../page-not-found/page-not-found";
import LoaderPage from "../loader-page/loader-page";
import {connect} from "react-redux";
import {loadMovie} from "../../store/api-actions";
import history from "../../browser-history";
import {getLastActiveMovie, getIsPageNotFound} from "../../store/selectors/state-selector";

class PlayerPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: true,
      duration: 0,
      elapsedTime: 0,
      isLoading: true
    };

    this.videoRef = createRef();
    this._handlePlaybackStatusChange = this._handlePlaybackStatusChange.bind(this);
    this._handleExitButtonClick = this._handleExitButtonClick.bind(this);
    this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
    this._handleSetIsLoading = this._handleSetIsLoading.bind(this);
  }

  _handleSetIsLoading(state) {
    this.setState({isLoading: state});

    const video = this.videoRef.current;

    if (video !== null) {
      video.play();
      video.onloadedmetadata = () => this.setState({duration: video.duration});
      video.ontimeupdate = () => this.setState({elapsedTime: Math.trunc(video.currentTime)});
    }
  }

  componentDidMount() {
    const newMovieId = parseInt(this.props.match.params.id, 10);
    this.props.onLoadMovie(newMovieId, this._handleSetIsLoading);
  }

  componentDidUpdate() {
    const video = this.videoRef.current;

    if (video !== null) {
      const {elapsedTime, duration} = this.state;

      if (this.state.isPlaying) {
        if (Math.trunc(elapsedTime) === Math.trunc(duration) && duration !== 0) {
          video.load();
          this._handlePlaybackStatusChange();
        } else {
          video.play();
        }
      } else {
        video.pause();
      }
    }
  }

  componentWillUnmount() {
    const video = this.videoRef.current;

    if (video !== null) {
      video.onloadmetadate = null;
      video.ontimeupdate = null;
    }
  }

  _handlePlaybackStatusChange() {
    this.setState((prevState) => ({isPlaying: !prevState.isPlaying}));
  }

  _handleExitButtonClick() {
    history.goBack();
  }

  _handleFullScreenButtonClick() {
    this.videoRef.current.requestFullscreen();
  }

  _getTimeLeft() {
    const {elapsedTime, duration} = this.state;

    const difference = duration - elapsedTime;

    const seconds = Math.trunc(difference % 60);
    const hours = Math.trunc(difference / 60 / 60);
    const minutes = Math.trunc(difference / 60 - hours * 60);

    return hours + `:` + (`0` + minutes).slice(-2) + `:` + (`0` + seconds).slice(-2);
  }

  render() {
    const timeLeft = this._getTimeLeft();
    const elapsedTimePrc = Math.round(this.state.elapsedTime * 100 / this.state.duration);
    const {isLoading, isPlaying} = this.state;
    const {movie, isPageNotFound} = this.props;

    return (
      <Fragment>
        {isLoading ?
          <LoaderPage /> :
          <Fragment>
            {isPageNotFound ?
              <PageNotFound /> :
              <div className="player">
                <video
                  className="player__video"
                  ref={this.videoRef}
                  src={movie.videoLink}
                  poster={movie.previewImage}
                />
                <button type="button" className="player__exit" onClick={this._handleExitButtonClick}>Exit</button>
  
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
                      onClick={this._handlePlaybackStatusChange}
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
  
                    <button type="button" className="player__full-screen" onClick={this._handleFullScreenButtonClick}>
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
  }
}

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
  onLoadMovie(movieId, setIsLoading) {
    dispatch(loadMovie(movieId, setIsLoading));
  }
});

export {PlayerPage};
export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);