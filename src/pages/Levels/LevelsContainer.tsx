import { useContext, useMemo } from "react";
import styles from "./LevelsContainer.module.css";
import { LevelContext, NUM_LEVELS } from "./LevelProvider";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { Save } from "../../components/Storage/Save";

function LevelsContainer() {
  const levelConfigs = useContext(LevelContext);
  const navigate = useNavigate();
  const save = useMemo(() => new Save(NUM_LEVELS), []);

  return (
    <div id="level-container" className={styles.levelContainer}>
      {levelConfigs.map((levelConfig, i) => {
        const levelIdx = i + 1;
        let buttonStyle = styles.levelButton;

        // levelIdx > 1 ensures the first level is never disabled
        // !save.isCompleted(levelIdx - 1) ensures the first uncompleted level
        //      is navigable since that's the next level in the game
        const isDisabledLevel =
          !save.isCompleted(levelIdx) &&
          levelIdx > 1 &&
          !save.isCompleted(levelIdx - 1);

        if (isDisabledLevel) {
          buttonStyle = styles.disabledLevelButton;
        }

        // game levels are 1-indexed, i + 1
        return (
          <Button
            disabled={isDisabledLevel}
            key={i + 1}
            data-testid={`level-button-${levelIdx}`}
            label={levelConfig.battle.title}
            className={buttonStyle}
            onClick={() => {
              navigate(`/battle/${levelIdx}`);
              save.complete(levelIdx);
            }}
          />
        );
      })}
    </div>
  );
}

export default LevelsContainer;
