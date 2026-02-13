const MULTI_WORD_FILE =
  "/multi_words.txt";

export class MultiWordGenerator {
  private words: string[] = [];

  constructor(
    private minWords: number,
    private maxWords: number
  ) {
    if (minWords < 0 || maxWords < 0) {
      throw new Error("Word count bounds must be non-negative.");
    }

    if (minWords > maxWords) {
      throw new Error(
        "Minimum word count cannot exceed maximum word count."
      );
    }
  }

  private async loadWords(): Promise<void> {
    if (this.words.length > 0) return;

    const response = await fetch(MULTI_WORD_FILE);
    if (!response.ok) {
      throw new Error(
        `Failed to load word file: ${MULTI_WORD_FILE}`
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

    if (this.maxWords > this.words.length) {
      throw new Error(
        `Cannot generate more than ${this.words.length} unique words.`
      );
    }

    const count =
      Math.floor(
        Math.random() * (this.maxWords - this.minWords + 1)
      ) + this.minWords;

    const result: string[] = [];
    const used = new Set<string>();

    while (result.length < count) {
      const index = Math.floor(
        Math.random() * this.words.length
      );
      const word = this.words[index];

      if (!used.has(word)) {
        used.add(word);
        result.push(word);
      }
    }

    return result.join(" ");
  }
}
