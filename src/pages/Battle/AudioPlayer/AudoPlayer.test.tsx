import { render } from "@testing-library/react";
import {
  TimerContext,
  TimerModel,
  TimerStateAction,
  TimerStatus,
} from "../Timer/TimerProvider";
import AudioPlayer from "./AudioPlayer";
import { Save } from "../../../components/Storage/Save";

function AudioTestConsumer(timerModel: TimerModel) {
  return (
    <TimerContext.Provider value={timerModel}>
      <AudioPlayer src={"/test.mp3"} />
    </TimerContext.Provider>
  );
}

describe("audio player tests", () => {
  let timerModel: TimerModel;

  let mockPlay = jest.fn();
  let mockPause = jest.fn();
  let mockLoad = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    timerModel = {
      timerState: {
        status: TimerStatus.Initialized,
        currentTime: 60,
        maxTime: 60,
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    window.HTMLAudioElement.prototype.play = mockPlay;
    window.HTMLAudioElement.prototype.pause = mockPause;
    window.HTMLAudioElement.prototype.load = mockLoad;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("audio player should initialize but not play audio", () => {
    render(AudioTestConsumer(timerModel));

    const audioElement = document.querySelector("audio");

    expect(audioElement).toBeInTheDocument();
    expect(mockPlay).not.toHaveBeenCalled();
  });

  it("audio should play when battle is in progress, ongoing timer", () => {
    timerModel.timerState.status = TimerStatus.Ongoing;

    render(AudioTestConsumer(timerModel));

    expect(mockPlay).toHaveBeenCalled();
  });

  it("audio should pause when level timer paused", () => {
    timerModel.timerState.status = TimerStatus.Ongoing;

    const { rerender } = render(AudioTestConsumer(timerModel));

    expect(mockPlay).toHaveBeenCalled();

    timerModel.timerState.status = TimerStatus.Paused;

    rerender(AudioTestConsumer(timerModel));

    expect(mockPause).toHaveBeenCalled();
  });

  it("audio should stop when level finished", () => {
    timerModel.timerState.status = TimerStatus.Ongoing;

    const { rerender } = render(AudioTestConsumer(timerModel));

    expect(mockPlay).toHaveBeenCalled();

    timerModel.timerState.status = TimerStatus.Done;

    rerender(AudioTestConsumer(timerModel));

    expect(mockPlay).toHaveBeenCalledTimes(1);
    expect(mockPause).toHaveBeenCalled();
  });

  it("audio should have volume level by user in save file", () => {
    jest.spyOn(Save.prototype, "getVolume").mockReturnValue(0.37);

    render(AudioTestConsumer(timerModel));

    const audioElement = document.querySelector("audio");

    expect(audioElement).toBeInTheDocument();
    expect(audioElement?.volume).toBe(0.37);
  });

  it("audio should not play if user mutes volume in game options", () => {
    jest.spyOn(Save.prototype, "getAudioMuted").mockReturnValue(true);

    timerModel.timerState.status = TimerStatus.Ongoing;

    render(AudioTestConsumer(timerModel));

    expect(mockPlay).not.toHaveBeenCalled();
  });
});
