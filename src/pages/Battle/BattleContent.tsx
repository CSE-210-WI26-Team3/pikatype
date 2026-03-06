import { useContext } from "react";
import { TypingTrackerContext } from "../../components/TypingTracker";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";
import { OpponentHealthBar, PlayerHealthBar } from "./HealthBar/HealthBar";
import styles from "./Battle.module.css";

import BattleTimer from "./Timer";

export function BattleContent({starterPokemon, enemyMaxHp,}: {starterPokemon: string;enemyMaxHp: number;}) {
  const { completedWords } = useContext(TypingTrackerContext);

  const enemyCurrentHp = Math.max(0, enemyMaxHp - completedWords);

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