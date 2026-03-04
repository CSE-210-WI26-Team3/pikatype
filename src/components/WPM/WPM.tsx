import styles from "./WPM.module.css";

interface WPMProps {
  wpm: number;
}

function WPM({ wpm }: WPMProps) {
  return (
    <div className={styles.wpmContainer}>
      <span className={styles.wpmValue}>{wpm}</span>
      <span className={styles.wpmLabel}>WPM</span>
    </div>
  );
}

export default WPM;
