import { useContext } from "react";
import TypingTrackerProvider from "../../components/TypingTracker/TypingTrackerProvider";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";
import Button from "../../components/Button";

import BattleTimer from "./Timer";
import TimerProvider from "./Timer/TimerProvider";
import styles from "./Battle.module.css";

import { PlayerHealthBar, HealthBar } from "./HealthBar/HealthBar";
import OpponentHealthProvider from "./OpponentHealth/OpponentHealthProvider";
import {
  OpponentHealthActionType,
  OpponentHealthContext,
} from "./OpponentHealth/OpponentHealthContext";

// TODO(level-config): Move tunables (time limit, enemy HP, damage per word, sprites) into a level config.
const BATTLE_TIME_SECONDS = 60;
const ENEMY_MAX_HP = 100;
const DAMAGE_PER_WORD = 10;

function toPercent(current: number, max: number) {
  if (max <= 0) return 0;
  return Math.floor((current / max) * 100);
}

// TODO(typing-integration): Remove the simulate button once typing success dispatches enemy damage.
function EnemyHealthBar() {
  const { healthState, dispatch } = useContext(OpponentHealthContext);
  const pct = toPercent(healthState.currentHp, healthState.maxHp);

  return (
    <div className={styles.enemyHud}>
      <HealthBar percentValue={pct} />
      <Button
        label={`Simulate word success (-${DAMAGE_PER_WORD} HP)`}
        onClick={() =>
          dispatch({
            type: OpponentHealthActionType.Damage,
            amount: DAMAGE_PER_WORD,
          })
        }
      />
    </div>
  );
}

function Battle() {
  return (
    <div className={styles.battleContainer}>
      <h1 className={styles.battleTitle}>Battle</h1>

      <TypingTrackerProvider>
        <TimerProvider time={BATTLE_TIME_SECONDS}>
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
              <OpponentHealthProvider maxHp={ENEMY_MAX_HP}>
                <EnemyHealthBar />
              </OpponentHealthProvider>

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
        </TimerProvider>
      </TypingTrackerProvider>
    </div>
  );
}

export default Battle;
