import { useNavigate } from "react-router";
import Button from "../../components/Button";
import styles from "./Levels.module.css";

const LEVELS = [
  "Home Row (Left Hand)",
  "Home Row (Right Hand)",
  "Home Row Both Hands",
  "Top Row",
  "Bottom Row",
  "Single Words",
  "Multiple Words",
  "Punctuation",
  "Short Sentences",
];

export type LevelConfiguration = {
  title: string;
  numPromptsToComplete: number;
};

export function isValidLevelConfig(
  config: LevelConfiguration,
): config is LevelConfiguration {
  return (
    config.title !== undefined &&
    typeof config.title === "string" &&
    config.numPromptsToComplete !== undefined &&
    typeof config.numPromptsToComplete === "number" &&
    config.numPromptsToComplete > 0
  );
}

function Levels() {
  const navigate = useNavigate();

  return (
    <div id="level-screen" className={styles.levelScreen}>
      <h1 className={styles.levelScreenTitle}>Levels</h1>
      <div id="level-container" className={styles.levelContainer}>
        {LEVELS.map((level, i) => {
          let buttonStyle = styles.levelButton;

          if (i > 2) {
            buttonStyle = styles.disabledLevelButton;
          }

          return (
            <Button
              disabled={i > 2}
              key={i + 1}
              label={level}
              className={buttonStyle}
              onClick={() => navigate(`/battle/${i + 1}`)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Levels;
