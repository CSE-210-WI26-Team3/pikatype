import styles from "./Levels.module.css";
import LevelsContainer from "./LevelsContainer";
import Button from "../../components/Button";
import { useNavigate } from "react-router";

export type LevelConfiguration = {
  title: string;
  numPromptsToComplete: number;
};

function Levels() {
  const navigate = useNavigate();

  return (
    <div id="level-screen" className={styles.levelScreen}>
      <h1 className={styles.levelScreenTitle}>Levels</h1>
      <LevelsContainer />
      <Button
        className={styles.backButton}
        label="Back to Menu"
        onClick={() => navigate("/")}
      />
    </div>
  );
}

export default Levels;
