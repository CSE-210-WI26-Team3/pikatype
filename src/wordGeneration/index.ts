export { SingleWordGenerator } from "./generators/SingleWordGenerator";
export { MultiWordGenerator } from "./generators/MultiWordGenerator";

export interface TypingPromptGenerator {
  getTypingPrompt(): Promise<string>;
}
