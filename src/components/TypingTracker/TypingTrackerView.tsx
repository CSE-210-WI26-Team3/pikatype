import { useContext, useEffect } from "react";
import { TypingTrackerContext, TypingTrackerProgress } from "./TypingTrackerProvider";
import TypingTrackerViewBox from "./TypingTrackerViewBox";

function TypingTrackerView() {
  const { content, cursor, state, completedWords, getNewContent } = useContext(TypingTrackerContext);

  if (state == TypingTrackerProgress.Complete) {
    // Celebrate
    setTimeout(() => {
      getNewContent();
    }, 2000);
  }

  return (
    <TypingTrackerViewBox />
  );
}

export default TypingTrackerView;