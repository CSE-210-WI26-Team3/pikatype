import { useContext, useEffect, useMemo } from "react";
import {
  TypingTrackerContext,
  TypingTrackerProgress,
} from "./TypingTrackerProvider";
import styles from "./TypingTracker.module.css";

function TypingTrackerViewBox() {
  const { content, cursor, state, completedWords, getNewContent } =
    useContext(TypingTrackerContext);

  const mapContentToSpans = (content: string, cursor: number) => {
    return content.split("").map((character, i) => {
      const spanStyles = [];
      if (state === TypingTrackerProgress.Complete) {
        spanStyles.push(styles.complete);
      } else if (i < cursor - 1) {
        spanStyles.push(styles.correct);
      } else if (i === cursor - 1) {
        spanStyles.push(
          state === TypingTrackerProgress.Valid
            ? styles.correct
            : styles.incorrect,
        );
      } else {
        spanStyles.push(styles.pending);
      }

      if (i === cursor) {
        spanStyles.push(styles.cursor);
      }

      return (
        <span key={i} className={spanStyles.join(" ")}>
          {character}
        </span>
      );
    });
  };

  const characterSpans = useMemo(
    () => mapContentToSpans(content, cursor),
    [content, cursor],
  );

  return <div>{characterSpans}</div>;
}

export default TypingTrackerViewBox;
