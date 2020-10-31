import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

export const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.props.isPlaying) {
        video.play();
      } else {
        video.load();
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          videoRef={this._videoRef}
        />
      );
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired
  };

  return WithVideo;
};
