import { BattleContent } from "./BattleContent";
import { useParams } from "react-router";
import { useMemo } from "react";
import TypingTrackerProvider from "../../components/TypingTracker/TypingTrackerProvider";

import TimerProvider from "./Timer/TimerProvider";
import styles from "./Battle.module.css";

import { Save } from "../../components/Storage/Save";
import { LEVEL_CONFIGS, NUM_LEVELS } from "../Levels/LevelConfigs";
import { getPokemonByLevel } from "../../data/pokemon";
import AudioPlayer from "./AudioPlayer/AudioPlayer";

function Battle() {
  const save = useMemo(() => new Save(NUM_LEVELS), []);
  const params = useParams();

  const levelId = parseInt(params.levelId!);

  if (Number.isNaN(levelId) || levelId < 1 || levelId > NUM_LEVELS) {
    throw new Error(`Level ID must be between 1 and ${NUM_LEVELS}`);
  }

  const currentLevel = LEVEL_CONFIGS[parseInt(params.levelId!) - 1];
  const chosenPokemon = getPokemonByLevel(save, currentLevel);
  const enemyMaxHp = currentLevel.battle.numPromptsToComplete;
  const enemyPokemon = currentLevel.enemyPokemon;

  return (
    <div className={styles.battleContainer}>
      <h1 className={styles.battleTitle}>{currentLevel.battle.title}</h1>
      <TypingTrackerProvider promptGenerator={currentLevel.generator}>
        <TimerProvider time={60}>
          <BattleContent
            starterPokemon={chosenPokemon}
            enemyPokemon={enemyPokemon}
            enemyMaxHp={enemyMaxHp}
          />
          <AudioPlayer src={process.env.PUBLIC_URL + currentLevel.audio} />
        </TimerProvider>
      </TypingTrackerProvider>
    </div>
  );
}

export default Battle;
