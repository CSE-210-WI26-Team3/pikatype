import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TypingTrackerProvider from "../../components/TypingTracker/TypingTrackerProvider";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";
import BattleTimer from "./Timer";
import TimerProvider from "./Timer/TimerProvider";
import styles from "./Battle.module.css";
import { PlayerHealthBar } from "./HealthBar/HealthBar";
import LevelCompleteModal from "./LevelCompleteModal/LevelCompleteModal";
import LevelFailedModal from "./LevelFailedModal/LevelFailedModal";
import { Save } from "../../components/Storage/Save";
import { useNavigate, useParams } from "react-router";
import { LEVEL_CONFIGS, NUM_LEVELS } from "../Levels/LevelConfigs";

const BATTLE_DURATION = 60;

function Battle() {
  const navigate = useNavigate();
  const params = useParams();
  const levelId = parseInt(params.levelId!);

  if (Number.isNaN(levelId) || levelId < 1 || levelId > NUM_LEVELS) {
    throw new Error(`Level ID must be between 1 and ${NUM_LEVELS}`);
  }

  const currentLevel = LEVEL_CONFIGS[levelId - 1];

  const totalCharsRef = useRef(0);
  const startTimeRef = useRef(0);
  const prevLevelIdRef = useRef<number | null>(null);
  const [battleKey, setBattleKey] = useState(0);

  useEffect(() => {
    if (prevLevelIdRef.current !== null && prevLevelIdRef.current !== levelId) {
      totalCharsRef.current = 0;
      startTimeRef.current = 0;
      setIsTimerActive(false);
      setWpm(0);
      setIsTimeUp(false);
      setIsLevelComplete(false);
      setBattleKey(prev => prev + 1);
    }
    prevLevelIdRef.current = levelId;
  }, [levelId]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  const save = useMemo(() => new Save(NUM_LEVELS), []);
  const starterPokemon = save.getStarter() || "bulbasaur";

  const handleWordTyped = useCallback((totalChars: number) => {
    totalCharsRef.current = totalChars;
  }, []);

  const handleTimerStart = useCallback(() => {
    startTimeRef.current = Date.now();
    setIsTimerActive(true);
  }, []);

  const handleTimerPause = useCallback(() => {
    setIsTimerActive(false);
  }, []);

  const handleTimerDone = useCallback(() => {
    const minutes = BATTLE_DURATION / 60;
    const finalWpm = Math.round((totalCharsRef.current / 5) / minutes);
    setWpm(finalWpm);
    setIsTimeUp(true);
  }, []);

  const handleLevelComplete = useCallback(() => {
    const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
    const finalWpm = Math.round((totalCharsRef.current / 5) / elapsedMinutes);
    save.complete(levelId);
    setWpm(finalWpm);
    setIsTimerActive(false);
    setIsLevelComplete(true);
  }, [levelId, save]);

  const handleNextLevel = useCallback(() => {
    if (levelId < NUM_LEVELS) {
      navigate(`/battle/${levelId + 1}`);
    } else {
      navigate("/levels");
    }
  }, [levelId, navigate]);

  const handlePlayAgain = useCallback(() => {
    totalCharsRef.current = 0;
    startTimeRef.current = 0;
    setIsTimerActive(false);
    setWpm(0);
    setIsTimeUp(false);
    setIsLevelComplete(false);
    setBattleKey(prev => prev + 1);
  }, []);

  return (
    <div className={styles.battleContainer}>
      <h1 className={styles.battleTitle}>Battle</h1>
      <TypingTrackerProvider
        key={battleKey}
        promptGenerator={currentLevel.generator}
        isActive={isTimerActive}
        numPromptsToComplete={currentLevel.battle.numPromptsToComplete}
        onWordTyped={handleWordTyped}
        onLevelComplete={handleLevelComplete}
      >
        <TimerProvider time={BATTLE_DURATION} onStart={handleTimerStart} onPause={handleTimerPause} onDone={handleTimerDone} isStopped={isLevelComplete}>
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
      {isTimeUp && <LevelFailedModal wpm={wpm} onPlayAgain={handlePlayAgain} />}
      {isLevelComplete && <LevelCompleteModal wpm={wpm} onNextLevel={handleNextLevel} />}
    </div>
  );
}

export default Battle;
