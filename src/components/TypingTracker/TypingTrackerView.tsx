import { useContext, useEffect } from "react";
import { TypingTrackerContext, TypingTrackerProgress } from "./TypingTrackerProvider";

function TypingTrackerView() {
  const { content, cursor, state, completedWords, getNewContent } = useContext(TypingTrackerContext);

  if (state == TypingTrackerProgress.Complete) {
    // Celebrate
    setTimeout(() => {
      getNewContent();
    }, 2000);
  }

  return (
    <div>
      <h1>Content: {content}</h1>
      <h1>Cursor: {cursor}</h1>
      <h1>State: {state}</h1>
      <h1>Completed Words: {completedWords}</h1>
    </div>
  );
}

export default TypingTrackerView;