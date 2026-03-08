import React, { useContext } from "react";
import { Progress } from "@base-ui/react";
import styles from "./HealthBar.module.css";
import { TimerContext } from "../Timer/TimerProvider";

interface HealthBarProps {
  percentValue: number;
}

export function HealthBar({ percentValue }: HealthBarProps) {
  return (
    <Progress.Root
      value={percentValue}
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

export function PlayerHealthBar() {
  const { timerState } = useContext(TimerContext);
  const playerHealth = Math.floor(
    (timerState.currentTime / timerState.maxTime) * 100,
  );

  return <HealthBar percentValue={playerHealth} />;
}

type OpponentHealthBarProps = {
  currentHp: number;
  maxHp: number;
};

function toPercent(current: number, max: number) {
  if (max <= 0) return 0;
  return Math.floor((current / max) * 100);
}

export function OpponentHealthBar({ currentHp, maxHp }: OpponentHealthBarProps) {
  return <HealthBar percentValue={toPercent(currentHp, maxHp)} />;
}