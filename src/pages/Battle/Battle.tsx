import TypingTrackerProvider from "../../components/TypingTracker/TypingTrackerProvider";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";
import BattleTimer from "./Timer";
import TimerProvider from "./Timer/TimerProvider";
import HealthBar from "./HealthBar";
import styles from "./Battle.module.css";
function Battle() {
  return (
    <div className={styles.battleContainer}>
      <h1 className={styles.battleTitle}>Battle</h1>
      <TypingTrackerProvider>
        <TimerProvider time={60}>
          <BattleTimer />

          <TypingTrackerView />
          <div className={styles.battleScene}>
            <div className={styles.playerPokemonContainer}>
              <HealthBar />
              <div className={styles.imagesContainer}>
                <img
                  className={styles.playerPokemon}
                  src="/img/pokemon/piplup.png"
                />
                <img
                  className={styles.grassPatch}
                  src="/img/grass_patch.png"
                  alt=""
                />
              </div>
            </div>
            <div className={styles.wildPokemonContainer}>
              <HealthBar />
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
        </TimerProvider>
      </TypingTrackerProvider>
    </div>
  );
}

export default Battle;
