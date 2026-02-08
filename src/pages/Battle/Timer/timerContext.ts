import { createContext, Dispatch } from "react";

export const TimerContext = createContext<TimerModel>({} as TimerModel);

export type TimerModel = {
  timerState: TimerState;
  dispatch: Dispatch<TimerStateAction>;
};

export type TimerState = {
  currentTime: number;
  maxTime: number;
  state: "initialized" | "ongoing" | "done" | "paused";
};

export type TimerStateAction = "decrement" | "start" | "pause";

export function timerReducer(
  state: TimerState,
  action: TimerStateAction,
): TimerState {
  switch (action) {
    case "pause":
      return { ...state, state: "paused" };
    case "decrement":
      const newTime = state.currentTime - 1;

      if (newTime <= 0)
        return { ...state, currentTime: newTime, state: "done" };
      else return { ...state, currentTime: newTime };
    case "start":
      return { ...state, state: "ongoing" };
  }
}
