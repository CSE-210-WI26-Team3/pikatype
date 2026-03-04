import Button from "../../../components/Button";
import WPM from "../../../components/WPM/WPM";
import styles from "./LevelFailedModal.module.css";

interface LevelFailedModalProps {
  wpm: number;
  onPlayAgain: () => void;
}

function LevelFailedModal({ wpm, onPlayAgain }: LevelFailedModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Time's Up!</h2>
        <WPM wpm={wpm} />
        <Button label="Play Again" className={styles.button} onClick={onPlayAgain} />
      </div>
    </div>
  );
}

export default LevelFailedModal;
