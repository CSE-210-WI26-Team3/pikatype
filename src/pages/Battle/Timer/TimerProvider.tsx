import { PropsWithChildren, useReducer, createContext, Dispatch } from "react";

export type TimerModel = {
  timerState: TimerState;
  dispatch: Dispatch<TimerStateAction>;
};

export enum TimerStatus {
  Initialized,
  Ongoing,
  Done,
  Paused,
}

export type TimerState = {
  currentTime: number;
  maxTime: number;
  status: TimerStatus;
};

export enum TimerStateAction {
  Decrement,
  Start,
  Pause,
  Finish,
}

const DEFAULT_TIMER_MODEL = {
  timerState: {
    currentTime: 60,
    maxTime: 60,
    status: TimerStatus.Initialized,
  },
  dispatch: () => {},
};

export const TimerContext = createContext<TimerModel>(DEFAULT_TIMER_MODEL);

export function timerReducer(
  state: TimerState,
  action: TimerStateAction,
): TimerState {
  switch (action) {
    case TimerStateAction.Pause:
      return { ...state, status: TimerStatus.Paused };
    case TimerStateAction.Decrement:
      const newTime = Math.max(state.currentTime - 1, 0);

      return { ...state, currentTime: newTime, status: TimerStatus.Ongoing };
    case TimerStateAction.Start:
      return { ...state, status: TimerStatus.Ongoing };
    case TimerStateAction.Finish:
      return { ...state, currentTime: 0, status: TimerStatus.Done };
  }
}

interface TimerProps extends PropsWithChildren {
  time: number;
}

function TimerProvider({ children, time }: TimerProps) {
  const initialTimerState: TimerState = {
    currentTime: time,
    maxTime: time,
    status: TimerStatus.Initialized,
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
