import React, {useRef, useEffect} from "react";
import PropTypes from "prop-types";

const MOUSE_ENTER_DELAY = 1000;

const PreviewVideoPlayer = (props) => {
  const {src, poster, isPlaying} = props;
  const videoRef = useRef(null);

  useEffect(() => {
    let timer = null;
    const video = videoRef.current;

    if (video) {
      if (isPlaying) {
        timer = setTimeout(() => video.play(), MOUSE_ENTER_DELAY);
      } else {
        clearTimeout(timer);
        video.load();
      }
    }

    return () => clearTimeout(timer);
  }, [isPlaying]);

  return (
    <video
      className="player__video"
      ref={videoRef}
      src={src}
      poster={poster}
      muted={true}
    />
  );
};

PreviewVideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default PreviewVideoPlayer;
