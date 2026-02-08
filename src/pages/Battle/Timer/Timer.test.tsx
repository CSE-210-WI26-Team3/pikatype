import { timerReducer, TimerState, TimerStateAction } from "./timerContext";

test("timer state properly starts", () => {
  const initialTimerState: TimerState = {
    currentTime: 60,
    maxTime: 60,
    state: "initialized",
  };

  const action: TimerStateAction = "start";

  const newTimerState = timerReducer(initialTimerState, action);

  expect(newTimerState.state).toBe("ongoing");
});

test("timer state properly counts down", () => {
  const runningTimerState: TimerState = {
    currentTime: 60,
    maxTime: 60,
    state: "ongoing",
  };

  const action: TimerStateAction = "decrement";

  const newTimerState = timerReducer(runningTimerState, action);

  expect(newTimerState.currentTime).toBe(runningTimerState.currentTime - 1);
  expect(newTimerState.state).toBe("ongoing");
});

test("timer state should pause", () => {
  const runningTimerState: TimerState = {
    currentTime: 39,
    maxTime: 60,
    state: "ongoing",
  };

  const action: TimerStateAction = "pause";

  const newTimerState = timerReducer(runningTimerState, action);

  expect(newTimerState.currentTime).toBe(39);
  expect(newTimerState.state).toBe("paused");
});

test("timer should finish", () => {
  const runningTimerState: TimerState = {
    currentTime: 1,
    maxTime: 60,
    state: "ongoing",
  };

  const action: TimerStateAction = "decrement";

  const newTimerState = timerReducer(runningTimerState, action);

  expect(newTimerState.currentTime).toBe(0);
  expect(newTimerState.state).toBe("done");
});
