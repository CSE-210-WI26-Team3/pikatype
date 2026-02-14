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
      id="healthbar"
    >
      <Progress.Label id="healthbar-label" className={styles.healthBarLabel}>
        HP
      </Progress.Label>
      <Progress.Track id="healthbar-track" className={styles.healthBarTrack}>
        <Progress.Indicator
          id="healthbar-indicator"
          className={styles.healthBarIndicator}
        />
      </Progress.Track>
    </Progress.Root>
  );
}

export default HealthBar;
