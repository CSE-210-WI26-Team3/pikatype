import { PropsWithChildren, useReducer, useEffect, createContext, Dispatch } from "react";

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
      const newTime = state.currentTime - 1;

      if (newTime > 0) {
        return { ...state, currentTime: newTime, status: TimerStatus.Ongoing };
      } else {
        return { ...state, currentTime: 0, status: TimerStatus.Done };
      }

    case TimerStateAction.Start:
      return { ...state, status: TimerStatus.Ongoing };
  }
}

interface TimerProps extends PropsWithChildren {
  time: number;
  onStart?: () => void;
  onDone?: () => void;
}

function TimerProvider({ children, time, onStart, onDone }: TimerProps) {
  const initialTimerState: TimerState = {
    currentTime: time,
    maxTime: time,
    status: TimerStatus.Initialized,
  };

  const [timerState, dispatch] = useReducer(timerReducer, initialTimerState);

  useEffect(() => {
    if (timerState.status === TimerStatus.Ongoing) {
      onStart?.();
    }
  }, [timerState.status, onStart]);

  useEffect(() => {
    if (timerState.status === TimerStatus.Done) {
      onDone?.();
    }
  }, [timerState.status, onDone]);

  const timerModel: TimerModel = {
    timerState,
    dispatch,
  };

  return (
    <TimerContext.Provider value={timerModel}>{children}</TimerContext.Provider>
  );
}

export default TimerProvider;
