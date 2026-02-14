import { act, render, screen } from "@testing-library/react";
import Timer from "./Timer";
import TimerProvider, {
  TimerContext,
  TimerModel,
  TimerStateAction,
  TimerStatus,
} from "./TimerProvider";

function pressStartButton() {
  const startButton = document.getElementById("start-button");
  expect(startButton).toBeTruthy();
  startButton!.click();
}

function pressPauseButton() {
  const pauseButton = document.getElementById("pause-button");
  expect(pauseButton).toBeTruthy();
  pauseButton!.click();
}

function assertTimerText(timeText: string) {
  expect(document.getElementById("timer-duration")).toHaveTextContent(timeText);
}

describe("Battle timer reducer unit tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("timer start action dispatched when start button clicked", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 60,
        maxTime: 60,
        status: TimerStatus.Initialized,
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    render(
      <TimerContext.Provider value={timerModel}>
        <Timer />
      </TimerContext.Provider>,
    );

    pressStartButton();

    expect(timerModel.dispatch).toHaveBeenCalledWith<[TimerStateAction]>(
      TimerStateAction.Start,
    );
  });

  test("timer decrement action dispatched every second", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 49,
        maxTime: 60,
        status: TimerStatus.Ongoing,
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
      TimerStateAction.Decrement,
    );

    jest.advanceTimersByTime(1000);

    expect(timerModel.dispatch).toHaveBeenCalledTimes(2);
    expect(timerModel.dispatch).toHaveBeenNthCalledWith<[TimerStateAction]>(
      2,
      TimerStateAction.Decrement,
    );
  });

  test("timer pause action dispatched when pause button clicked", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 49,
        maxTime: 60,
        status: TimerStatus.Ongoing,
      },
      dispatch: jest.fn<void, [TimerStateAction]>(),
    };

    render(
      <TimerContext.Provider value={timerModel}>
        <Timer />
      </TimerContext.Provider>,
    );

    pressPauseButton();

    expect(timerModel.dispatch).toHaveBeenCalled();
    expect(timerModel.dispatch).toHaveBeenCalledWith<[TimerStateAction]>(
      TimerStateAction.Pause,
    );
  });

  test("timer decrement action should not be dispatched while paused", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 49,
        maxTime: 60,
        status: TimerStatus.Paused,
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
        currentTime: 0,
        maxTime: 60,
        status: TimerStatus.Ongoing,
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
      TimerStateAction.Finish,
    );
  });

  test("timer actions should not be dispatched when done", () => {
    const timerModel: TimerModel = {
      timerState: {
        currentTime: 0,
        maxTime: 60,
        status: TimerStatus.Done,
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

/**
 * In these tests, when working with fake timers, all actions must be in
 * separate act() blocks because fake timers fire all callbacks at once,
 * not sequentually like when using real timer functions.
 */
describe("battle timer component tests", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("timer should display correct time", () => {
    render(
      <TimerProvider time={85}>
        <Timer />
      </TimerProvider>,
    );

    assertTimerText("01:25");
  });

  test("timer should start when start button clicked", () => {
    render(
      <TimerProvider time={60}>
        <Timer />
      </TimerProvider>,
    );
    act(() => {
      pressStartButton();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    assertTimerText("00:59");
  });

  test("timer decreases every second", () => {
    render(
      <TimerProvider time={60}>
        <Timer />
      </TimerProvider>,
    );

    act(() => {
      pressStartButton();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    assertTimerText("00:55");
  });

  test("timer pauses when pause button clicked", () => {
    render(
      <TimerProvider time={60}>
        <Timer />
      </TimerProvider>,
    );

    act(() => {
      pressStartButton();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    assertTimerText("00:55");

    act(() => {
      pressPauseButton();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    assertTimerText("00:55");
  });

  test("timer should stop at 0", () => {
    render(
      <TimerProvider time={2}>
        <Timer />
      </TimerProvider>,
    );

    act(() => {
      pressStartButton();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    assertTimerText("00:00");

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    assertTimerText("00:00");
  });
});
