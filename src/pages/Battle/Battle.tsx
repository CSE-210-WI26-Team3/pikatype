import { useContext } from "react";
import TypingTrackerProvider, {
  TypingTrackerContext,
} from "../../components/TypingTracker/TypingTrackerProvider";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";

import BattleTimer from "./Timer";
import TimerProvider from "./Timer/TimerProvider";
import styles from "./Battle.module.css";

import { PlayerHealthBar, OpponentHealthBar } from "./HealthBar/HealthBar";

// TODO(level-config): Move tunables (time limit, enemy HP, damage per word, sprites) into a level config.
const BATTLE_TIME_SECONDS = 60;
const ENEMY_MAX_HP = 100;
const DAMAGE_PER_WORD = 10;

export function BattleContent() {
  const { completedWords } = useContext(TypingTrackerContext);

  const enemyCurrentHp = Math.max(
    0,
    ENEMY_MAX_HP - completedWords * DAMAGE_PER_WORD,
  );

  return (
    <>
      <BattleTimer />
      <TypingTrackerView />

      <div className={styles.battleScene}>
        <div className={styles.playerPokemonContainer}>
          <PlayerHealthBar />

          <div className={styles.imagesContainer}>
            <img
              className={styles.playerPokemon}
              src={process.env.PUBLIC_URL + "/img/pokemon/piplup.png"}
              alt="player pokemon sprite"
            />
            <img
              className={styles.grassPatch}
              src={process.env.PUBLIC_URL + "/img/grass_patch.png"}
              alt="grass patch"
            />
          </div>
        </div>

        <div className={styles.wildPokemonContainer}>
          <div className={styles.enemyHud}>
            <OpponentHealthBar currentHp={enemyCurrentHp} maxHp={ENEMY_MAX_HP} />
          </div>

          <div className={styles.imagesContainer}>
            <img
              className={styles.wildPokemon}
              src={process.env.PUBLIC_URL + "/img/pokemon/bidoof.png"}
              alt="wild pokemon sprite"
            />
            <img
              className={styles.grassPatch}
              src={process.env.PUBLIC_URL + "/img/grass_patch.png"}
              alt="grass patch"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function Battle() {
  return (
    <div className={styles.battleContainer}>
      <h1 className={styles.battleTitle}>Battle</h1>

      <TypingTrackerProvider>
        <TimerProvider time={BATTLE_TIME_SECONDS}>
          <BattleContent />
        </TimerProvider>
      </TypingTrackerProvider>
    </div>
  );
}

export default Battle;