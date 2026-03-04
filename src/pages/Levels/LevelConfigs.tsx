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
};

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    battle: {
      title: "Home Row (Left Hand)",
      numPromptsToComplete: 20,
    },
    generator: new GibberishGenerator(3, 5, "asdfg".split("")),
  },
  {
    battle: {
      title: "Home Row (Right Hand)",
      numPromptsToComplete: 20,
    },
    generator: new GibberishGenerator(3, 5, "hjkl".split("")),
  },
  {
    battle: {
      title: "Home Row (Both Hands)",
      numPromptsToComplete: 20,
    },

    generator: new GibberishGenerator(3, 5, "asdfghjkl".split("")),
  },
  {
    battle: {
      title: "Top Row",
      numPromptsToComplete: 20,
    },

    generator: new GibberishGenerator(3, 5, "qwertyuiop".split("")),
  },
  {
    battle: {
      title: "Bottom Row",
      numPromptsToComplete: 20,
    },

    generator: new GibberishGenerator(3, 5, "zxcvbnm".split("")),
  },
  {
    battle: {
      title: "Single Words",
      numPromptsToComplete: 15,
    },
    generator: new SingleWordGenerator(),
  },
  {
    battle: {
      title: "Multiple Words",
      numPromptsToComplete: 10,
    },
    generator: new MultiWordGenerator(3, 5),
  },
  {
    battle: {
      title: "Punctuation (Top Row)",
      numPromptsToComplete: 10,
    },

    generator: new GibberishGenerator(3, 5, "!@#$%&*()-=_+".split("")),
  },
  {
    battle: {
      title: "Punctuation (Right Side)",
      numPromptsToComplete: 10,
    },

    generator: new GibberishGenerator(3, 5, "[]{};':\",./<>?".split("")),
  },
  {
    battle: {
      title: "Short Sentences",
      numPromptsToComplete: 5,
    },

    // TODO: replace with sentence generator once that PR gets merged
    generator: new SentenceGenerator(),
  },
];

export const NUM_LEVELS = LEVEL_CONFIGS.length;
