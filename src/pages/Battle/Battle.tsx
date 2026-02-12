import { useContext } from "react";
import BattleTimer from "./Timer";
import TimerProvider from "./Timer/TimerProvider";
import { TimerContext } from "./Timer/timerContext";

import HealthBar from "./HealthBar";
import OpponentHealthProvider from "./OpponentHealth/OpponentHealthProvider";
import { OpponentHealthContext } from "./OpponentHealth/OpponentHealthContext";

import TypingTrackerProvider from "../../components/TypingTracker/TypingTrackerProvider";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";

import Button from "../../components/Button";
import styles from "./Battle.module.css";

// TODO (level-config): Move these into a config file per level (time, damage, sprites, HP, etc..)

const BATTLE_TIME_SECONDS = 60;
const ENEMY_MAX_HP = 100;
const DAMAGE_PER_WORD = 10;

const PLAYER_SPRITE = "/img/pokemon/piplup.png";
const ENEMY_SPRITE = "/img/pokemon/bidoof.png";

function toPercent(current: number, max: number) {
  if (max <= 0) return 0;
  return (current / max) * 100;
}

function PlayerHealthBar() {
  const { timerState } = useContext(TimerContext);
  const pct = toPercent(timerState.currentTime, timerState.maxTime);
  return <HealthBar type="player" valuePercent={pct} />;
}

function EnemyHealthBar() {
  const { healthState, dispatch } = useContext(OpponentHealthContext);
  const pct = toPercent(healthState.currentHp, healthState.maxHp);

  return (
    <div className={styles.enemyHud}>
      <HealthBar type="enemy" valuePercent={pct} />
      <Button
        label={`Simulate word success (-${DAMAGE_PER_WORD} HP)`}
        onClick={() => dispatch({ type: "damage", amount: DAMAGE_PER_WORD })}
      />
    </div>
  );
}

function Battle() {
  return (
    <div className={styles.battleContainer}>
      <h1 className={styles.battleTitle}>Battle</h1>

      <TimerProvider time={BATTLE_TIME_SECONDS}>
        <TypingTrackerProvider>
          <OpponentHealthProvider maxHp={ENEMY_MAX_HP}>
            <BattleTimer />
            <TypingTrackerView />

            <div className={styles.battleScene}>
              <div className={styles.playerPokemonContainer}>
                <PlayerHealthBar />
                <div className={styles.imagesContainer}>
                  <img
                    className={styles.playerPokemon}
                    src={PLAYER_SPRITE}
                    alt=""
                  />
                  <img
                    className={styles.grassPatch}
                    src="/img/grass_patch.png"
                    alt=""
                  />
                </div>
              </div>

              <div className={styles.wildPokemonContainer}>
                <EnemyHealthBar />
                <div className={styles.imagesContainer}>
                  <img
                    className={styles.wildPokemon}
                    src={ENEMY_SPRITE}
                    alt=""
                  />
                  <img
                    className={styles.grassPatch}
                    src="/img/grass_patch.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </OpponentHealthProvider>
        </TypingTrackerProvider>
      </TimerProvider>
    </div>
  );
}

export default Battle;
