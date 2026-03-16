import { useContext, useEffect } from "react";
import Button from "../../../components/Button";
import { TimerContext, TimerStateAction, TimerStatus } from "./TimerProvider";
import styles from "./Timer.module.css";

function Timer() {
  const { timerState, dispatch } = useContext(TimerContext);

  useEffect(() => {
    if (timerState.status === TimerStatus.Ongoing) {
      const countdownInterval = setInterval(() => {
        dispatch(TimerStateAction.Decrement);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [timerState.status, dispatch]);

  const minutes = Math.floor(timerState.currentTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timerState.currentTime % 60).toString().padStart(2, "0");

  return (
    <div className={styles.timerContainer}>
      <p id="timer-duration" className={styles.timer}>
        Time Left: {minutes}:{seconds}
      </p>
      {timerState.status !== TimerStatus.Ongoing &&
        timerState.status !== TimerStatus.Stopped && (
          <Button
            id="start-button"
            className={styles.timerButton}
            label={
              timerState.currentTime !== timerState.maxTime ? "Resume" : "Start"
            }
            onClick={() => dispatch(TimerStateAction.Start)}
          />
        )}
      {timerState.status === TimerStatus.Ongoing && (
        <Button
          id="pause-button"
          className={styles.timerButton}
          label="Pause"
          onClick={() => dispatch(TimerStateAction.Pause)}
        />
      )}
    </div>
  );
}

export default Timer;
