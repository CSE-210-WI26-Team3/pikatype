import styles from "./Levels.module.css";
import LevelProvider from "./LevelProvider";
import LevelsContainer from "./LevelsContainer";
import Button from "../../components/Button";
import { useNavigate } from "react-router";

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
    <LevelProvider>
      <div id="level-screen" className={styles.levelScreen}>
        <h1 className={styles.levelScreenTitle}>Levels</h1>
        <LevelsContainer />
        <Button
          className={styles.backButton}
          label="Back to Menu"
          onClick={() => navigate("/")}
        />
      </div>
    </LevelProvider>
  );
}

export default Levels;
