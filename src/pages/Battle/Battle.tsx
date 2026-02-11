import { useContext } from "react";
import BattleTimer from "./Timer";
import TimerProvider from "./Timer/TimerProvider";
import { TimerContext } from "./Timer/timerContext";

import HealthBar from "./HealthBar";
import OpponentHealthProvider from "./OpponentHealth/OpponentHealthProvider";
import { OpponentHealthContext } from "./OpponentHealth/OpponentHealthContext";

import Button from "../../components/Button";
import styles from "./Battle.module.css";

function PlayerHealthBar() {
  const { timerState } = useContext(TimerContext);
  const pct = (timerState.currentTime / timerState.maxTime) * 100;

  return <HealthBar type="player" valuePercent={pct} />;
}

function EnemyHealthBar() {
  const { healthState, dispatch } = useContext(OpponentHealthContext);
  const pct = (healthState.currentHp / healthState.maxHp) * 100;

  return (
    <div>
      <HealthBar type="enemy" valuePercent={pct} />
      <Button
        label="Simulate word success (-10 HP)"
        onClick={() => dispatch({ type: "damage", amount: 10 })}
      />
    </div>
  );
}

function Battle() {
  return (
    <div className={styles.battleContainer}>
      <h1 className={styles.battleTitle}>Battle</h1>

      <TimerProvider time={60}>
        <OpponentHealthProvider maxHp={100}>
          <BattleTimer />

          <div className={styles.battleScene}>
            <div className={styles.playerPokemonContainer}>
              <PlayerHealthBar />
              <div className={styles.imagesContainer}>
                <img
                  className={styles.playerPokemon}
                  src="/img/pokemon/piplup.png"
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
                  src="/img/pokemon/bidoof.png"
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
      </TimerProvider>
    </div>
  );
}

export default Battle;
