import React from "react";
import { Progress } from "@base-ui/react";
import styles from "./Healthbar.module.css";

export type HealthBarType = "player" | "enemy";

type HealthBarProps = {
  type: HealthBarType;       
  valuePercent: number;      
  label?: string;            
};

function HealthBar({ type, label = "HP", valuePercent }: HealthBarProps) {

  return (
    <Progress.Root
      value={valuePercent}
      className={styles.healthBarContainer}
      role="healthbar"
    >
      <Progress.Label role="healthbar-label" className={styles.healthBarLabel}>
        {label}
      </Progress.Label>

      <Progress.Track
        role="healthbar-track"
        className={`${styles.healthBarTrack} ${type === "enemy" ? styles.enemyTrack : ""}`}
      >
        <Progress.Indicator
          role="healthbar-indicator"
          className={`${styles.healthBarIndicator} ${
            type === "enemy" ? styles.enemy : styles.player
          }`}
        />
      </Progress.Track>

    </Progress.Root>
  );
}

export default HealthBar;