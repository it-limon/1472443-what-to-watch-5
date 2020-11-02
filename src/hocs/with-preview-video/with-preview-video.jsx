import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const MOUSE_ENTER_DELAY = 1000;

export const withPreviewVideo = (Component) => {
  class WithPreviewVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();
      this.timer = null;
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.props.isPlaying) {
        this.timer = setTimeout(() => video.play(), MOUSE_ENTER_DELAY);
      } else {
        clearTimeout(this.timer);
        video.load();
      }
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
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

  WithPreviewVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired
  };

  return WithPreviewVideo;
};
