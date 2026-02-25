const SINGLE_WORD_FILE =
  "/single_words.txt";

export class SingleWordGenerator {
  private words: string[] = [];

  private async loadWords(): Promise<void> {
    if (this.words.length > 0) return;

    const response = await fetch(SINGLE_WORD_FILE);
    if (!response.ok) {
      throw new Error(
        `Failed to load word file: ${SINGLE_WORD_FILE}`
      );
    }

    const text = await response.text();
    this.words = text
      .split("\n")
      .map((w) => w.trim())
      .filter(Boolean);

    if (this.words.length === 0) {
      throw new Error("Word file is empty.");
    }
  }

  async getTypingPrompt(): Promise<string> {
    await this.loadWords();

    const index = Math.floor(
      Math.random() * this.words.length
    );
    return this.words[index];
  }
}
