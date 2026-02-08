import React, { useContext } from "react";
import { Progress } from "@base-ui/react";
import styles from "./Healthbar.module.css";
import { TimerContext } from "../Timer/timerContext";

function HealthBar() {
  const timerModel = useContext(TimerContext);

  return (
    <Progress.Root
      value={Math.floor((timerModel.timerState.time / 60) * 100)}
      className={styles.healthBarContainer}
    >
      <Progress.Label className={styles.healthBarLabel}>HP</Progress.Label>
      <Progress.Track className={styles.healthBarTrack}>
        <Progress.Indicator className={styles.healthBarIndicator} />
      </Progress.Track>
    </Progress.Root>
  );
}

export default HealthBar;
