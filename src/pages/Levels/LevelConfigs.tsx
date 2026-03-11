import { GibberishGenerator } from "../../wordGeneration/GibberishGenerator";
import {
  MultiWordGenerator,
  SentenceGenerator,
  SingleWordGenerator,
  TypingPromptGenerator,
} from "../../wordGeneration/index";
import { BattleConfig } from "../Battle/index";

export type LevelConfig = {
  battle: BattleConfig;
  generator: TypingPromptGenerator;
  evolution: number;
  enemyPokemon: string;
};

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    battle: {
      title: "Home Row (Left Hand)",
      numPromptsToComplete: 20,
    },
    generator: new GibberishGenerator(3, 5, "asdfg".split("")),
    evolution: 0,
    enemyPokemon: "bidoof",
  },
  {
    battle: {
      title: "Home Row (Right Hand)",
      numPromptsToComplete: 20,
    },
    generator: new GibberishGenerator(3, 5, "hjkl".split("")),
    evolution: 0,
    enemyPokemon: "psyduck",
  },
  {
    battle: {
      title: "Home Row (Both Hands)",
      numPromptsToComplete: 20,
    },

    generator: new GibberishGenerator(3, 5, "asdfghjkl".split("")),
    evolution: 0,
    enemyPokemon: "pikachu",
  },
  {
    battle: {
      title: "Top Row",
      numPromptsToComplete: 20,
    },
    generator: new GibberishGenerator(3, 5, "qwertyuiop".split("")),
    evolution: 1,
    enemyPokemon: "luxray",
  },
  {
    battle: {
      title: "Bottom Row",
      numPromptsToComplete: 20,
    },
    generator: new GibberishGenerator(3, 5, "zxcvbnm".split("")),
    evolution: 1,
    enemyPokemon: "umbreon",
  },
  {
    battle: {
      title: "Single Words",
      numPromptsToComplete: 15,
    },
    generator: new SingleWordGenerator(),
    evolution: 1,
    enemyPokemon: "snorlax",
  },
  {
    battle: {
      title: "Multiple Words",
      numPromptsToComplete: 10,
    },
    generator: new MultiWordGenerator(3, 5),
    evolution: 2,
    enemyPokemon: "lucario",
  },
  {
    battle: {
      title: "Punctuation (Top Row)",
      numPromptsToComplete: 10,
    },
    generator: new GibberishGenerator(3, 5, "!@#$%&*()-=_+".split("")),
    evolution: 2,
    enemyPokemon: "garchomp",
  },
  {
    battle: {
      title: "Punctuation (Right Side)",
      numPromptsToComplete: 10,
    },
    generator: new GibberishGenerator(3, 5, "[]{};':\",./<>?".split("")),
    evolution: 2,
    enemyPokemon: "dragonite",
  },
  {
    battle: {
      title: "Short Sentences",
      numPromptsToComplete: 5,
    },
    generator: new SentenceGenerator(),
    evolution: 2,
    enemyPokemon: "lugia",
  },
];

export const NUM_LEVELS = LEVEL_CONFIGS.length;
