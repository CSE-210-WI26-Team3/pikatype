/*
Name: gibberishGeneration.ts
Description: Contains the code for the gibberish generator that takes in a list of 
Characters and output a random string up to 5 to 8 letters
We can control the range of letters and the Characters as well
*/

import { TypingPromptGenerator } from ".";

type GibberishData = {
  Characters: string[];
  MinLen: number;
  MaxLen: number;
};

class GibberishGenerator implements TypingPromptGenerator {
  Characters: string[];
  MinLen: number;
  MaxLen: number;

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
      throw new Error("Number of Characters passed is empty.");
    }

    for (const element of characters) {
      // If the length of a word is not
      if (element.length !== 1) {
        throw new Error(
          "Length of strings are not 1. Strings must be singular Characters",
        );
      }
    }

    this.Characters = characters;
    this.MinLen = minLen;
    this.MaxLen = maxLen;
  }

  async getTypingPrompt(): Promise<string> {
    const WordLen = Math.floor(
      Math.random() * (this.MaxLen - this.MinLen + 1) + this.MinLen,
    );

    let GeneratedWord = "";
    for (let i = 0; i < WordLen; i++) {
      const ChosenChar =
        this.Characters[Math.floor(Math.random() * this.Characters.length)];

      GeneratedWord = GeneratedWord + ChosenChar;
    }

    return GeneratedWord;
  }
}

export { GibberishGenerator };
export type { GibberishData };
