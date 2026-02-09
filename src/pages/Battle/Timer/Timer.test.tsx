import { render, screen } from "@testing-library/react";
import Timer from "./Timer";
import {
  TimerContext,
  TimerModel,
  timerReducer,
  TimerState,
  TimerStateAction,
} from "./timerContext";

describe("Battle timer event dispatcher", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("timer start action dispatched when start button clicked", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 60,
        maxTime: 60,
        state: "initialized",
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    render(
      <TimerContext.Provider value={timerModel}>
        <Timer />
      </TimerContext.Provider>,
    );

    screen.getByText("start").click();

    expect(timerModel.dispatch).toHaveBeenCalledWith<[TimerStateAction]>(
      "start",
    );
  });

  test("timer decrement action dispatched every second", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 49,
        maxTime: 60,
        state: "ongoing",
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    render(
      <TimerContext.Provider value={timerModel}>
        <Timer />
      </TimerContext.Provider>,
    );

    jest.advanceTimersByTime(1000);

    expect(timerModel.dispatch).toHaveBeenCalled();
    expect(timerModel.dispatch).toHaveBeenCalledWith<[TimerStateAction]>(
      "decrement",
    );

    jest.advanceTimersByTime(1000);

    expect(timerModel.dispatch).toHaveBeenCalledTimes(2);
    expect(timerModel.dispatch).toHaveBeenNthCalledWith<[TimerStateAction]>(
      2,
      "decrement",
    );
  });

  test("timer pause action dispatched when pause button clicked", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 49,
        maxTime: 60,
        state: "ongoing",
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    render(
      <TimerContext.Provider value={timerModel}>
        <Timer />
      </TimerContext.Provider>,
    );

    screen.getByText("pause").click();

    expect(timerModel.dispatch).toHaveBeenCalled();
    expect(timerModel.dispatch).toHaveBeenCalledWith<[TimerStateAction]>(
      "pause",
    );
  });

  test("timer decrement action should not be dispatched while paused", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 49,
        maxTime: 60,
        state: "paused",
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    render(
      <TimerContext.Provider value={timerModel}>
        <Timer />
      </TimerContext.Provider>,
    );

    jest.advanceTimersByTime(5000);

    expect(timerModel.dispatch).toHaveBeenCalledTimes(0);
  });

  test("timer finish action should be dispatched when timer runs out", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 1,
        maxTime: 60,
        state: "ongoing",
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    render(
      <TimerContext.Provider value={timerModel}>
        <Timer />
      </TimerContext.Provider>,
    );

    jest.advanceTimersByTime(1000);

    expect(timerModel.dispatch).toHaveBeenCalled();
    expect(timerModel.dispatch).toHaveBeenCalledWith<[TimerStateAction]>(
      "finish",
    );
  });

  test("timer actions should not be dispatched when done", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 0,
        maxTime: 60,
        state: "done",
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    render(
      <TimerContext.Provider value={timerModel}>
        <Timer />
      </TimerContext.Provider>,
    );

    jest.advanceTimersByTime(5000);

    expect(timerModel.dispatch).toHaveBeenCalledTimes(0);
  });
});
