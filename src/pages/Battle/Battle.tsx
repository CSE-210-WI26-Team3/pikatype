import { useCallback, useRef, useState } from "react";
import TypingTrackerProvider from "../../components/TypingTracker/TypingTrackerProvider";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";
import BattleTimer from "./Timer";
import TimerProvider from "./Timer/TimerProvider";
import styles from "./Battle.module.css";
import { PlayerHealthBar } from "./HealthBar/HealthBar";
import LevelCompleteModal from "./LevelCompleteModal/LevelCompleteModal";

const BATTLE_DURATION = 6;

function Battle() {
  const totalCharsRef = useRef(0);
  const [battleKey, setBattleKey] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  const handleWordComplete = useCallback((wordLength: number) => {
    totalCharsRef.current += wordLength;
  }, []);

  const handleTimerStart = useCallback(() => {
    setIsTimerActive(true);
  }, []);

  const handleTimerDone = useCallback(() => {
    const minutes = BATTLE_DURATION / 60;
    const finalWpm = Math.round((totalCharsRef.current / 5) / minutes);
    setWpm(finalWpm);
    setIsLevelComplete(true);
  }, []);

  const handlePlayAgain = useCallback(() => {
    totalCharsRef.current = 0;
    setIsTimerActive(false);
    setWpm(0);
    setIsLevelComplete(false);
    setBattleKey(prev => prev + 1);
  }, []);

  return (
    <div className={styles.battleContainer}>
      <h1 className={styles.battleTitle}>Battle</h1>
      <TypingTrackerProvider key={battleKey} isActive={isTimerActive} onWordComplete={handleWordComplete}>
        <TimerProvider time={BATTLE_DURATION} onStart={handleTimerStart} onDone={handleTimerDone}>
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
      <LevelCompleteModal isVisible={isLevelComplete} wpm={wpm} onPlayAgain={handlePlayAgain} />
    </div>
  );
}

export default Battle;
