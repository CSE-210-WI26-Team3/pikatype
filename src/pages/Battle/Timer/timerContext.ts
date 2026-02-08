import { createContext, Dispatch } from "react";

export const TimerContext = createContext<TimerModel>({} as TimerModel);

export type TimerModel = {
  timerState: TimerState;
  dispatch: Dispatch<TimerStateAction>;
};

export type TimerState = {
  time: number;
  state: "initialized" | "ongoing" | "done" | "paused";
};

export type TimerStateAction = "decrement" | "start" | "finish" | "pause";

export function timerReducer(
  state: TimerState,
  action: TimerStateAction,
): TimerState {
  switch (action) {
    case "pause":
      return { ...state, state: "paused" };
    case "decrement":
      return { ...state, time: state.time - 1 };
    case "start":
      return { ...state, state: "ongoing" };
    case "finish":
      return { time: 0, state: "done" };
  }
}
