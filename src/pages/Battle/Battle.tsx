import { BattleContent } from "./BattleContent";
import { useParams } from "react-router";
import { useMemo } from "react";
import TypingTrackerProvider  from "../../components/TypingTracker/TypingTrackerProvider";

import TimerProvider from "./Timer/TimerProvider";
import styles from "./Battle.module.css";

import { Save } from "../../components/Storage/Save";
import { LEVEL_CONFIGS, NUM_LEVELS } from "../Levels/LevelConfigs";

function Battle() {
  const save = useMemo(() => new Save(NUM_LEVELS), []);
  const starterPokemon = save.getStarter() || "bulbasaur";
  const params = useParams();

  const levelId = parseInt(params.levelId!);

  if (Number.isNaN(levelId) || levelId < 1 || levelId > NUM_LEVELS) {
    throw new Error(`Level ID must be between 1 and ${NUM_LEVELS}`);
  }

  const currentLevel = LEVEL_CONFIGS[parseInt(params.levelId!) - 1];
  const enemyMaxHp = currentLevel.battle.numPromptsToComplete;
  
  return (
    <div className={styles.battleContainer}>
      <h1 className={styles.battleTitle}>{currentLevel.battle.title}</h1>

      <TypingTrackerProvider promptGenerator={currentLevel.generator}>
        <TimerProvider time={60}>
          <BattleContent starterPokemon={starterPokemon} enemyMaxHp={enemyMaxHp} />
        </TimerProvider>
      </TypingTrackerProvider>
    </div>
  );
}

export default Battle;