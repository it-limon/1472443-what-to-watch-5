import React, {PureComponent, createRef} from "react";
import history from "../../browser-history";
import {connect} from "react-redux";
import {loadMovie} from "../../store/api-actions";
import PropTypes from "prop-types";
import Props from "../../props";
import {getLastActiveMovie, getIsPageNotFound} from "../../store/selectors/state-selector";

export const withMovieVideo = (Component) => {
  class WithMovieVideo extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: true,
        duration: 0,
        elapsedTime: 0,
        isLoading: true
      };

      this._videoRef = createRef();
      this._handlePlaybackStatusChange = this._handlePlaybackStatusChange.bind(this);
      this._handleExitButtonClick = this._handleExitButtonClick.bind(this);
      this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
      this._handleSetIsLoading = this._handleSetIsLoading.bind(this);
    }

    _handleSetIsLoading(state) {
      this.setState({isLoading: state});

      const video = this._videoRef.current;

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
      const video = this._videoRef.current;

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
      const video = this._videoRef.current;

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
      this._videoRef.current.requestFullscreen();
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

      return (
        <Component
          {...this.props}
          movie={this.props.movie}
          videoRef={this._videoRef}
          isPlaying={this.state.isPlaying}
          onPlaybackStatusChange={this._handlePlaybackStatusChange}
          onExitButtonClick={this._handleExitButtonClick}
          onFullScreenButtonClick={this._handleFullScreenButtonClick}
          elapsedTimePrc={elapsedTimePrc}
          timeLeft={timeLeft}
          isLoading={this.state.isLoading}
          isPageNotFound={this.props.isPageNotFound}
        />
      );
    }
  }

  WithMovieVideo.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }),
    movie: Props.movie,
    onLoadMovie: PropTypes.func.isRequired,
    isPageNotFound: PropTypes.bool.isRequired
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithMovieVideo);
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
