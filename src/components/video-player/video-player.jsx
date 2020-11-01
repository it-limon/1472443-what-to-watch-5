import React from "react";
import PropTypes from "prop-types";

const VideoPlayer = (props) => {
  const {videoRef, src, poster, isMuted} = props;

  return (
    <video
      className="player__video"
      ref={videoRef}
      src={src}
      poster={poster}
      muted={isMuted}
    />
  );
};

VideoPlayer.defaultProps = {
  isMuted: false
};

VideoPlayer.propTypes = {
  videoRef: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired
};

export default VideoPlayer;
