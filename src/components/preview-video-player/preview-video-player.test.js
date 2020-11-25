import React from "react";
import renderer from "react-test-renderer";
import PreviewVideoPlayer from "./preview-video-player";

describe(`Render PreviewVideoPlayer`, () => {

  it(`Render PreviewVideoPlayer`, () => {
    const tree = renderer
      .create(
          <PreviewVideoPlayer
            src={`src.avi`}
            poster={`poster.jpg`}
            isPlaying={true}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
