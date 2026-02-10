import {
  getRandomEnglishWord,
  getRandomEnglishWords,
} from "./wordGenerator";
import {
  ENGLISH_WORD_LENGTH,
  ENGLISH_WORD_COUNT,
} from "./config";

describe("English word generator", () => {
  it("returns a word within the required length bounds", () => {
    const word = getRandomEnglishWord();

    expect(word.length).toBeGreaterThanOrEqual(
      ENGLISH_WORD_LENGTH.MIN
    );
    expect(word.length).toBeLessThanOrEqual(
      ENGLISH_WORD_LENGTH.MAX
    );
  });

  it("returns multiple words when requested", () => {
    const words = getRandomEnglishWords(3);

    expect(words).toHaveLength(3);

    words.forEach((word) => {
      expect(word.length).toBeGreaterThanOrEqual(
        ENGLISH_WORD_LENGTH.MIN
      );
      expect(word.length).toBeLessThanOrEqual(
        ENGLISH_WORD_LENGTH.MAX
      );
    });
  });

  it("throws an error when word count is out of bounds", () => {
    expect(() =>
      getRandomEnglishWords(
        ENGLISH_WORD_COUNT.MAX + 1
      )
    ).toThrow();
  });

  it("uses a provided word list deterministically", () => {
    const customWords = [
      "extraordinary",
      "misconfiguration",
    ];

    const words = getRandomEnglishWords(2, {
      wordList: customWords,
      rng: () => 0,
    });

    expect(words).toEqual([
      customWords[0],
      customWords[0],
    ]);
  });

  it("throws an error when no valid words exist", () => {
    expect(() =>
      getRandomEnglishWord({
        wordList: ["short", "tiny"],
      })
    ).toThrow();
  });
});
