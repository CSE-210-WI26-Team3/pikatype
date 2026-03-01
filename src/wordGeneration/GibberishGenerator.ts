/*
Name: gibberishGeneration.ts
Description: Contains the code for the gibberish generator that takes in a list of 
Characters and output a random string up to 5 to 8 letters
We can control the range of letters and the Characters as well
*/

type GibberishData = {
  Characters: string[];
  MinLen: number;
  MaxLen: number;
};

class GibberishGenerator {
  Characters: string[];
  MinLen: number;
  MaxLen: number;

  constructor(JsonData: GibberishData) {
    if (JsonData.MinLen <= 0) {
      throw new Error("Minimum word length isn't greater than 0");
    }

    if (JsonData.MaxLen <= JsonData.MinLen) {
      throw new Error(
        "Maximum word length is equal to or less than the minimum word length",
      );
    }

    if (JsonData.Characters.length == 0) {
      throw new Error("Number of Characters passed is empty.");
    }

    for (const element of JsonData.Characters) {
      // If the length of a word is not
      if (element.length != 1) {
        throw new Error(
          "Length of strings are not 1. Strings must be singular Characters",
        );
      }
    }

    this.Characters = JsonData.Characters;
    this.MinLen = JsonData.MinLen;
    this.MaxLen = JsonData.MaxLen;
  }

  generate() {
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
