import { useContext, useEffect } from "react";
import Button from "../../../components/Button";
import { TimerContext } from "./timerContext";
import styles from "./Timer.module.css";

function Timer() {
  const { timerState, dispatch } = useContext(TimerContext);

  useEffect(() => {
    if (timerState.state === "ongoing") {
      const countdownInterval = setInterval(() => {
        if (timerState.currentTime <= 1) dispatch("finish");
        else dispatch("decrement");
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
      <p>
        Time Left: {minutes}:{seconds}
      </p>
      <p>{timerState.state}</p>
      {timerState.state !== "ongoing" && (
        <Button
          className={styles.timer}
          label="start"
          onClick={() => dispatch("start")}
        ></Button>
      )}
      {timerState.state === "ongoing" && (
        <Button
          className={styles.timer}
          label="pause"
          onClick={() => dispatch("pause")}
        ></Button>
      )}
    </div>
  );
}

export default Timer;
