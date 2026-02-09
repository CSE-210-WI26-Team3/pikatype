import { useContext, useEffect } from "react";
import { TypingTrackerContext, TypingTrackerProgress } from "./TypingTrackerProvider";
import TypingTrackerViewBox from "./TypingTrackerViewBox";
import styles from "./TypingTracker.module.css";

function TypingTrackerView() {
  const { state, getNewContent } = useContext(TypingTrackerContext);

  useEffect(() => {
    if (state === TypingTrackerProgress.Complete) {
      const timer = setTimeout(() => {
        getNewContent();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [state, getNewContent]);

  return (
    <div className={styles.typingBoxWrapper}>
      <div className={styles.typingBox}>
        <TypingTrackerViewBox />
      </div>
    </div>
  );
}

export default TypingTrackerView;