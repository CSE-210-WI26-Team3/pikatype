export { SingleWordGenerator } from "./generators/SingleWordGenerator";
export { MultiWordGenerator } from "./generators/MultiWordGenerator";
export { SentenceGenerator } from "./generators/SentenceGenerator";

export interface TypingPromptGenerator {
  getTypingPrompt(): Promise<string>;
}

export type TypingPromptGeneratorConfig =
  | {
      type: "gibberish";
      minLength: number;
      maxLength: number;
      charSet: string;
    }
  | {
      type: "single-word";
    }
  | {
      type: "multiple-word";
      minLength: number;
      maxLength: number;
    }
  | {
      type: "sentence";
    };
