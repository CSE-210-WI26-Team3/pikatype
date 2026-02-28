import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  TypingTrackerContext,
  TypingTrackerProgress,
} from "./TypingTrackerProvider";
import styles from "./TypingTracker.module.css";

function TypingTrackerViewBox() {
  const { content, cursor, state } =
    useContext(TypingTrackerContext);
  const [animationClass, setAnimationClass] = useState("");
  const prevContentRef = useRef(content);

  useEffect(() => {
    if (state === TypingTrackerProgress.Complete) {
      setAnimationClass(styles.completedAnimation);
    }
  }, [state]);

  useEffect(() => {
    if (prevContentRef.current !== content) {
      prevContentRef.current = content;
      setAnimationClass(styles.fadeIn);
    }
  }, [content]);

  const characterSpans = useMemo(
    () =>
      content.split("").map((character, i) => {
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
      }),
    [content, cursor, state],
  );

  return (
    <div
      className={`${styles.wordContainer} ${animationClass}`}
      onAnimationEnd={() => setAnimationClass("")}
    >
      {characterSpans}
    </div>
  );
}

export default TypingTrackerViewBox;
