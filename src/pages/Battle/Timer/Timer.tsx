import { useContext, useEffect } from "react";
import Button from "../../../components/Button";
import { TimerContext } from "./timerContext";
import styles from "./Timer.module.css";

function Timer() {
  const { timerState, dispatch } = useContext(TimerContext);

  useEffect(() => {
    if (timerState.state === "ongoing") {
      const countdownInterval = setInterval(() => {
        if (timerState.currentTime > 0) dispatch("decrement");
        else dispatch("finish");
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [timerState, dispatch]);

  const minutes = Math.floor(timerState.currentTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timerState.currentTime % 60).toString().padStart(2, "0");

  return (
    <div className={styles.timer}>
      <p id="timer-duration">
        Time Left: {minutes}:{seconds}
      </p>
      <p>{timerState.state}</p>
      {timerState.state !== "ongoing" && (
        <Button
          id="start-button"
          className={styles.timer}
          label="start"
          onClick={() => dispatch("start")}
        />
      )}
      {timerState.state === "ongoing" && (
        <Button
          id="pause-button"
          className={styles.timer}
          label="pause"
          onClick={() => dispatch("pause")}
        />
      )}
    </div>
  );
}

export default Timer;
