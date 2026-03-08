import { TypingPromptGenerator } from "../index";

const SENTENCE_FILE = process.env.PUBLIC_URL + "/sentences.txt";

export class SentenceGenerator implements TypingPromptGenerator {
  private sentences: string[] = [];

  private async loadSentences(): Promise<void> {
    if (this.sentences.length > 0) return;

    const response = await fetch(SENTENCE_FILE);
    if (!response.ok) {
      throw new Error(`Failed to load sentence file: ${SENTENCE_FILE}`);
    }

    const text = await response.text();
    this.sentences = text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (this.sentences.length === 0) {
      throw new Error("Sentence file is empty.");
    }
  }

  async getTypingPrompt(): Promise<string> {
    await this.loadSentences();

    const index = Math.floor(Math.random() * this.sentences.length);
    return this.sentences[index];
  }
}
