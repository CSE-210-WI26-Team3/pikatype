import { useMemo } from "react";
import TypingTrackerProvider from "../../components/TypingTracker/TypingTrackerProvider";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";
import BattleTimer from "./Timer";
import TimerProvider from "./Timer/TimerProvider";
import styles from "./Battle.module.css";
import { PlayerHealthBar } from "./HealthBar/HealthBar";
import { Save } from "../../components/Storage/Save";

const NUM_LEVELS = 3;

function Battle() {
  const save = useMemo(() => new Save(NUM_LEVELS), []);
  const starterPokemon = save.getStarter() || "bulbasaur";
  return (
    <div className={styles.battleContainer}>
      <h1 className={styles.battleTitle}>Battle</h1>
      <TypingTrackerProvider>
        <TimerProvider time={60}>
          <BattleTimer />

          <TypingTrackerView />
          <div className={styles.battleScene}>
            <div className={styles.playerPokemonContainer}>
              <PlayerHealthBar />
              <div className={styles.imagesContainer}>
                <img
                  className={styles.playerPokemon}
                  src={process.env.PUBLIC_URL + `/img/pokemon/${starterPokemon}.png`}
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
