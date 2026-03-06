import { useContext, useEffect, useRef, useState } from "react";
import { TypingTrackerContext } from "../../components/TypingTracker";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";
import { OpponentHealthBar, PlayerHealthBar } from "./HealthBar/HealthBar";
import styles from "./Battle.module.css";

import BattleTimer from "./Timer";

export function BattleContent({starterPokemon, enemyMaxHp,}: {starterPokemon: string;enemyMaxHp: number;}) {
  const { completedWords } = useContext(TypingTrackerContext);

  const enemyCurrentHp = Math.max(0, enemyMaxHp - completedWords);

  const prevCompletedWords = useRef(completedWords);
  const [isEnemyHit, setIsEnemyHit] = useState(false);
  const [isPlayerAttack, setIsPlayerAttack] = useState(false);

  useEffect(() => {
    if (completedWords > prevCompletedWords.current) {
      // Trigger battle animations for player attack and enemy hit reaction
      setIsEnemyHit(true);
      setIsPlayerAttack(true);

      // Reset animation state after animation duration
      const timeout = setTimeout(() => {
        setIsEnemyHit(false);
        setIsPlayerAttack(false);
      }, 600);

      // Update previous word count so we only trigger on new completions
      prevCompletedWords.current = completedWords;

      return () => clearTimeout(timeout);
    }

    prevCompletedWords.current = completedWords;
  }, [completedWords]);

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