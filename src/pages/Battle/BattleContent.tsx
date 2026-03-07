import { useContext, useEffect, useRef, useState } from "react";
import { TypingTrackerContext } from "../../components/TypingTracker";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";
import { OpponentHealthBar, PlayerHealthBar } from "./HealthBar/HealthBar";
import styles from "./Battle.module.css";

import BattleTimer from "./Timer";

export function BattleContent({starterPokemon, enemyPokemon, enemyMaxHp,}: {starterPokemon: string; enemyPokemon: string; enemyMaxHp: number;}) {
  const { completedWords } = useContext(TypingTrackerContext);

  const HEALTH_UPDATE_DELAY_MS = 300;
  const ANIMATION_DURATION_MS = 600;

  const [displayedCompletedWords, setDisplayedCompletedWords] =
    useState(completedWords);
  const [isEnemyHit, setIsEnemyHit] = useState(false);
  const [isPlayerAttack, setIsPlayerAttack] = useState(false);

  const prevCompletedWords = useRef(completedWords);

  // Delay updating enemy health bar until the hit visually "lands"
  useEffect(() => {

    const timeout = setTimeout(() => {
      setDisplayedCompletedWords(completedWords);
    }, HEALTH_UPDATE_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [completedWords]);

  useEffect(() => {
    if (completedWords > prevCompletedWords.current) {
      // Trigger battle animations for player attack and enemy hit reaction
      setIsPlayerAttack(true);
      setIsEnemyHit(true);

      // Reset animation state after animation duration
      const timeout = setTimeout(() => {
        setIsPlayerAttack(false);
        setIsEnemyHit(false);
      }, ANIMATION_DURATION_MS);

      // Update previous word count so animations only trigger on new completions
      prevCompletedWords.current = completedWords;

      return () => clearTimeout(timeout);
    }

    prevCompletedWords.current = completedWords;
  }, [completedWords]);

  const enemyCurrentHp = Math.max(0, enemyMaxHp - displayedCompletedWords);

  return (
    <>
      <BattleTimer />
      <TypingTrackerView />

      <div className={styles.battleScene}>
        <div className={styles.playerPokemonContainer}>
          <PlayerHealthBar />

          <div className={styles.imagesContainer}>
            <img
              className={`${styles.playerPokemon} ${
                isEnemyHit ? styles.playerAttackAnimation : ""
              }`}
              src={process.env.PUBLIC_URL +`/img/pokemon/${starterPokemon}.png`}
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
            <OpponentHealthBar currentHp={enemyCurrentHp} maxHp={enemyMaxHp} />
          </div>

          <div className={styles.imagesContainer}>
            <img
              className={`${styles.wildPokemon} ${
                isPlayerAttack ? styles.enemyHitAnimation : ""
              }`}
              src={process.env.PUBLIC_URL + `/img/pokemon/${enemyPokemon}.png`}
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