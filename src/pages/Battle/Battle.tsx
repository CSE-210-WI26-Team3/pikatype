import TypingTrackerProvider from "../../components/TypingTracker/TypingTrackerProvider";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";
import BattleTimer from "./Timer";
import TimerProvider from "./Timer/TimerProvider";
import styles from "./Battle.module.css";
import { PlayerHealthBar } from "./HealthBar/HealthBar";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { isValidLevelConfig } from "../Levels/Levels";
import {
  SingleWordGenerator,
  TypingPromptGenerator,
} from "../../wordGeneration";
import { isSingleWordGeneratorConfig } from "../../wordGeneration/generators/SingleWordGenerator";
import {
  isMultiWordGeneratorConfig,
  MultiWordGenerator,
} from "../../wordGeneration/generators/MultiWordGenerator";

function Battle() {
  const [isLoadingConfig, setIsLoadingConfig] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("Battle");
  const [typingGenerator, setTypingGenerator] = useState<TypingPromptGenerator>(
    new SingleWordGenerator(),
  );
  const params = useParams();

  const fetchLevelConfig = useCallback(async () => {
    const path = `${process.env.PUBLIC_URL}/config/level${params.levelId}.json`;
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const configData = await response.json();
    const levelConfig = configData.level;
    const generatorConfig = configData.generator;

    if (isValidLevelConfig(levelConfig)) {
      setTitle(levelConfig.title);
    }

    if (isSingleWordGeneratorConfig(generatorConfig)) {
      setTypingGenerator(new SingleWordGenerator());
    } else if (isMultiWordGeneratorConfig(generatorConfig)) {
      setTypingGenerator(
        new MultiWordGenerator(
          generatorConfig.maxLength,
          generatorConfig.maxLength,
        ),
      );
    }

    setIsLoadingConfig(false);
  }, [params.levelId]);

  useEffect(() => {
    fetchLevelConfig();
  }, [fetchLevelConfig]);

  if (isLoadingConfig) {
    return (
      <div className={styles.battleContainer}>
        <p className={styles.loading}>loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.battleContainer}>
      <h1 className={styles.battleTitle}>{title}</h1>
      <TypingTrackerProvider promptGenerator={typingGenerator}>
        <TimerProvider time={60}>
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
    </div>
  );
}

export default Battle;
