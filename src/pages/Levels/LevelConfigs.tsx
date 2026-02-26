import {
  MultiWordGenerator,
  SingleWordGenerator,
  TypingPromptGenerator,
} from "../../wordGeneration/index";
import { BattleConfig } from "../Battle/index";

export type LevelConfig = {
  battle: BattleConfig;
  generator: TypingPromptGenerator;
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
  },
  {
    battle: {
      title: "Single Words",
      numPromptsToComplete: 20,
    },
    generator: new SingleWordGenerator(),
  },
  {
    battle: {
      title: "Multiple Words",
      numPromptsToComplete: 20,
    },
    generator: new MultiWordGenerator(3, 5),
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
  },
];

export const NUM_LEVELS = LEVEL_CONFIGS.length;
