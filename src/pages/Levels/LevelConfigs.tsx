import {
  MultiWordGenerator,
  SingleWordGenerator,
  TypingPromptGenerator,
} from "../../wordGeneration/index";
import { BattleConfig } from "../Battle/index";

export type LevelConfig = {
  battle: BattleConfig;
  generator: TypingPromptGenerator;
  evolution: number;
};

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    battle: {
      title: "Home Row (Left Hand)",
      numPromptsToComplete: 20,
    },
    generator: new SingleWordGenerator(),
    // generator: {
    //   type: "gibberish",
    //   minLength: 3,
    //   maxLength: 5,
    //   charSet: "asdfg",
    // },
    evolution: 0,
  },
  {
    battle: {
      title: "Home Row (Right Hand)",
      numPromptsToComplete: 20,
    },
    generator: new SingleWordGenerator(),
    // generator: {
    //   type: "gibberish",
    //   minLength: 3,
    //   maxLength: 5,
    //   charSet: "hjkl",
    // },
    evolution: 0,
  },
  {
    battle: {
      title: "Home Row (Both Hands)",
      numPromptsToComplete: 20,
    },

    generator: new SingleWordGenerator(),
    // generator: {
    //   type: "gibberish",
    //   minLength: 3,
    //   maxLength: 5,
    //   charSet: "asdfghjkl",
    // },
    evolution: 0,
  },
  {
    battle: {
      title: "Top Row",
      numPromptsToComplete: 20,
    },

    generator: new SingleWordGenerator(),
    // generator: {
    //   type: "gibberish",
    //   minLength: 3,
    //   maxLength: 5,
    //   charSet: "qwertyuiop",
    // },
    evolution: 1,
  },
  {
    battle: {
      title: "Bottom Row",
      numPromptsToComplete: 20,
    },

    generator: new SingleWordGenerator(),
    // generator: {
    //   type: "gibberish",
    //   minLength: 3,
    //   maxLength: 5,
    //   charSet: "zxcvbnm",
    // },
    evolution: 1,
  },
  {
    battle: {
      title: "Single Words",
      numPromptsToComplete: 20,
    },
    generator: new SingleWordGenerator(),
    evolution: 1,
  },
  {
    battle: {
      title: "Multiple Words",
      numPromptsToComplete: 20,
    },
    generator: new MultiWordGenerator(3, 5),
    evolution: 2,
  },
  {
    battle: {
      title: "Punctuation (Top Row)",
      numPromptsToComplete: 20,
    },

    generator: new SingleWordGenerator(),
    // generator: {
    //   type: "gibberish",
    //   minLength: 3,
    //   maxLength: 5,
    //   charSet: "!@#$%&*()-=_+",
    // },
    evolution: 2,
  },
  {
    battle: {
      title: "Punctuation (Right Side)",
      numPromptsToComplete: 20,
    },

    generator: new SingleWordGenerator(),
    // generator: {
    //   type: "gibberish",
    //   minLength: 3,
    //   maxLength: 5,
    //   charSet: "[]{};':\",./<>?",
    // },
    evolution: 2,
  },
  {
    battle: {
      title: "Short Sentences",
      numPromptsToComplete: 20,
    },

    generator: new SingleWordGenerator(),
    // generator: {
    //   type: "sentence",
    // },
    evolution: 2,
  },
];

export const NUM_LEVELS = LEVEL_CONFIGS.length;
