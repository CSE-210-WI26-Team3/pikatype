/*
Name: gibberishGeneration.ts
Description: Contains the code for the gibberish generator that takes in a list of 
characters and output a random string up to 5 to 8 letters
We can control the range of letters and the characters as well
*/

import { TypingPromptGenerator } from ".";

/**
 * Substrings that must not appear in generated gibberish words.
 * Checked case-insensitively. Add entries in lowercase.
 */
export const BANNED_SUBSTRINGS: string[] = [
  "ass",
  "fag",
  "gash",
  "shag",
  "slag",
  "tit",
  "wop",
];

type GibberishData = {
  characters: string[];
  minLen: number;
  maxLen: number;
};

class GibberishGenerator implements TypingPromptGenerator {
  characters: string[];
  minLen: number;
  maxLen: number;

  constructor(minLen: number, maxLen: number, characters: string[]) {
    if (minLen <= 0) {
      throw new Error("Minimum word length isn't greater than 0");
    }

    if (maxLen <= minLen) {
      throw new Error(
        "Maximum word length is equal to or less than the minimum word length",
      );
    }

    if (characters.length === 0) {
      throw new Error("Number of characters passed is empty.");
    }

    for (const element of characters) {
      // If the length of a word is not
      if (element.length !== 1) {
        throw new Error(
          "Length of strings are not 1. Strings must be singular characters",
        );
      }
    }

    this.characters = characters;
    this.minLen = minLen;
    this.maxLen = maxLen;
  }

  private containsBannedSubstring(word: string): boolean {
    const lowerWord = word.toLowerCase();
    return BANNED_SUBSTRINGS.some((banned) => lowerWord.includes(banned));
  }

  async getTypingPrompt(): Promise<string> {
    let generatedWord: string;

    do {
      const wordLen = Math.floor(
        Math.random() * (this.maxLen - this.minLen + 1) + this.minLen,
      );

      generatedWord = "";
      for (let i = 0; i < wordLen; i++) {
        const chosenChar =
          this.characters[Math.floor(Math.random() * this.characters.length)];

        generatedWord = generatedWord + chosenChar;
      }
    } while (this.containsBannedSubstring(generatedWord));

    return generatedWord;
  }
}

export { GibberishGenerator };
export type { GibberishData };
