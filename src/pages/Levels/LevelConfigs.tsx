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
  audio: string;
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
    audio: "/audio/wild.mp3",
  },
  {
    battle: {
      title: "Home Row (Right Hand)",
      numPromptsToComplete: 20,
    },
    generator: new GibberishGenerator(3, 5, "hjkl".split("")),
    evolution: 0,
    enemyPokemon: "psyduck",
    audio: "/audio/wild.mp3",
  },
  {
    battle: {
      title: "Home Row (Both Hands)",
      numPromptsToComplete: 20,
    },

    generator: new GibberishGenerator(3, 5, "asdfghjkl".split("")),
    evolution: 0,
    enemyPokemon: "pikachu",
    audio: "/audio/wild.mp3",
  },
  {
    battle: {
      title: "Top Row",
      numPromptsToComplete: 20,
    },
    generator: new GibberishGenerator(3, 5, "qwertyuiop".split("")),
    evolution: 1,
    enemyPokemon: "luxray",
    audio: "/audio/miniboss.mp3",
  },
  {
    battle: {
      title: "Bottom Row",
      numPromptsToComplete: 20,
    },
    generator: new GibberishGenerator(3, 5, "zxcvbnm".split("")),
    evolution: 1,
    enemyPokemon: "umbreon",
    audio: "/audio/miniboss.mp3",
  },
  {
    battle: {
      title: "Single Words",
      numPromptsToComplete: 15,
    },
    generator: new SingleWordGenerator(),
    evolution: 1,
    enemyPokemon: "snorlax",
    audio: "/audio/miniboss.mp3",
  },
  {
    battle: {
      title: "Multiple Words",
      numPromptsToComplete: 10,
    },
    generator: new MultiWordGenerator(3, 5),
    evolution: 2,
    enemyPokemon: "lucario",
    audio: "/audio/neo_team_plasma_theme.mp3",
  },
  {
    battle: {
      title: "Punctuation (Top Row)",
      numPromptsToComplete: 10,
    },
    generator: new GibberishGenerator(3, 5, "!@#$%&*()-=_+".split("")),
    evolution: 2,
    enemyPokemon: "garchomp",
    audio: "/audio/cynthia_theme.mp3",
  },
  {
    battle: {
      title: "Punctuation (Right Side)",
      numPromptsToComplete: 10,
    },
    generator: new GibberishGenerator(3, 5, "[]{};':\",./<>?".split("")),
    evolution: 2,
    enemyPokemon: "dragonite",
    audio: "/audio/n_theme.mp3",
  },
  {
    battle: {
      title: "Short Sentences",
      numPromptsToComplete: 5,
    },
    generator: new SentenceGenerator(),
    evolution: 2,
    enemyPokemon: "lugia",
    audio: "/audio/final.mp3",
  },
];

export const NUM_LEVELS = LEVEL_CONFIGS.length;
