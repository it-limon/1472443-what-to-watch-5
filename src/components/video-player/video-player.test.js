import React, {createRef} from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";

const ref = createRef();

describe(`Render VideoPlayer`, () => {

  it(`Render VideoPlayer muted`, () => {
    const tree = renderer
      .create(
          <VideoPlayer
            videoRef={ref}
            src={`src.avi`}
            poster={`poster.jpg`}
            isMuted={true}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render VideoPlayer not muted`, () => {
    const tree = renderer
      .create(
          <VideoPlayer
            videoRef={ref}
            src={`src.avi`}
            poster={`poster.jpg`}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
