import React, {createRef} from "react";
import renderer from "react-test-renderer";
import PlayerPage from "./player-page";
import {testMovie} from "../../test-dataset/test-movie";

const noop = () => {};
const ref = createRef();

describe(`Render PlayerPage`, () => {

  it(`Render PlayerPage`, () => {
    const tree = renderer
      .create(
          <PlayerPage
            movie={testMovie}
            isLoading={false}
            isPlaying={true}
            elapsedTimePrc={54}
            timeLeft={`2:45:12`}
            videoRef={ref}
            onPlaybackStatusChange={noop}
            onExitButtonClick={noop}
            onFullScreenButtonClick={noop}
            isPageNotFound={false}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
