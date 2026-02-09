import { useContext, useEffect } from "react";
import { TypingTrackerContext, TypingTrackerProgress } from "./TypingTrackerProvider";
import TypingTrackerViewBox from "./TypingTrackerViewBox";

function TypingTrackerView() {
  const { content, cursor, state, completedWords, getNewContent } = useContext(TypingTrackerContext);

  useEffect(() => {
    if (state === TypingTrackerProgress.Complete) {
      const timer = setTimeout(() => {
        getNewContent();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [state, getNewContent]);

  return (
    <TypingTrackerViewBox />
  );
}

export default TypingTrackerView;