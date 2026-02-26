import Button from "../../../components/Button";
import WPM from "../../../components/WPM/WPM";
import styles from "./TimeUpModal.module.css";

interface TimeUpModalProps {
  isVisible: boolean;
  wpm: number;
  onPlayAgain: () => void;
}

function TimeUpModal({ isVisible, wpm, onPlayAgain }: TimeUpModalProps) {
  if (!isVisible) return null;

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

export default TimeUpModal;
