import Button from "../../../components/Button";
import WPM from "../../../components/WPM/WPM";
import styles from "./LevelCompleteModal.module.css";

interface LevelCompleteModalProps {
  wpm: number;
  onNextLevel?: () => void;
}

function LevelCompleteModal({ wpm, onNextLevel }: LevelCompleteModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Level Complete!</h2>
        <WPM wpm={wpm} />
        <Button label="Next Level" className={styles.button} onClick={onNextLevel} disabled={!onNextLevel} />
      </div>
    </div>
  );
}

export default LevelCompleteModal;
