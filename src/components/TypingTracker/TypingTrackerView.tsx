import { useContext, useEffect } from "react";
import { TypingTrackerContext, TypingTrackerProgress } from "./TypingTrackerProvider";
import TypingTrackerViewBox from "./TypingTrackerViewBox";
import styles from "./TypingTracker.module.css";

function TypingTrackerView() {
  const { state, getNewContent, isAllPromptsComplete } = useContext(TypingTrackerContext);
  const fadeInTime = 600;

  useEffect(() => {
    if (state === TypingTrackerProgress.Complete && !isAllPromptsComplete) {
      const timer = setTimeout(() => {
        getNewContent();
      }, fadeInTime);
    
      return () => clearTimeout(timer);
    }
  }, [state, getNewContent, isAllPromptsComplete]);

  return (
    <div className={styles.typingBoxWrapper}>
      <div className={styles.typingBox}>
        <TypingTrackerViewBox />
      </div>
    </div>
  );
}

export default TypingTrackerView;