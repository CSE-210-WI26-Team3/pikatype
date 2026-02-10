import { PropsWithChildren, useReducer } from "react";
import {
  TimerContext,
  TimerModel,
  timerReducer,
  TimerState,
} from "./timerContext";

interface TimerProps extends PropsWithChildren {
  time: number;
}

function TimerProvider({ children, time }: TimerProps) {
  const initialTimerState: TimerState = {
    currentTime: time,
    maxTime: time,
    state: "initialized",
  };

  const [timerState, dispatch] = useReducer(timerReducer, initialTimerState);

  const timerModel: TimerModel = {
    timerState,
    dispatch,
  };

  return (
    <TimerContext.Provider value={timerModel}>{children}</TimerContext.Provider>
  );
}

export default TimerProvider;
