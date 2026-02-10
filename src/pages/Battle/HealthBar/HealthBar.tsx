import React, { useContext } from "react";
import { Progress } from "@base-ui/react";
import styles from "./Healthbar.module.css";
import { TimerContext } from "../Timer/timerContext";

function HealthBar() {
  const timerModel = useContext(TimerContext);

  return (
    <Progress.Root
      value={Math.floor(
        (timerModel.timerState.currentTime / timerModel.timerState.maxTime) *
          100,
      )}
      className={styles.healthBarContainer}
      role="healthbar"
    >
      <Progress.Label role="healthbar-label" className={styles.healthBarLabel}>
        HP
      </Progress.Label>
      <Progress.Track role="healthbar-track" className={styles.healthBarTrack}>
        <Progress.Indicator
          role="healthbar-indicator"
          className={styles.healthBarIndicator}
        />
      </Progress.Track>
    </Progress.Root>
  );
}

export default HealthBar;
