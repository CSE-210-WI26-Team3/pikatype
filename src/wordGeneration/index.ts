export { SingleWordGenerator } from "./generators/SingleWordGenerator";
export { MultiWordGenerator } from "./generators/MultiWordGenerator";
export { SentenceGenerator } from "./generators/SentenceGenerator";

export interface TypingPromptGenerator {
  getTypingPrompt(): Promise<string>;
}
