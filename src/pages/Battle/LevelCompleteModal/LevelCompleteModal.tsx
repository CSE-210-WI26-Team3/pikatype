import Button from "../../../components/Button";
import WPM from "../../../components/WPM/WPM";
import styles from "./LevelCompleteModal.module.css";

interface LevelCompleteModalProps {
  isVisible: boolean;
  wpm: number;
  onPlayAgain: () => void;
}

function LevelCompleteModal({ isVisible, wpm, onPlayAgain }: LevelCompleteModalProps) {
  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Level Complete!</h2>
        <WPM wpm={wpm} />
        <Button label="Play Again" className={styles.button} onClick={onPlayAgain} />
      </div>
    </div>
  );
}

export default LevelCompleteModal;
