import {
  ENGLISH_WORD_LENGTH,
  ENGLISH_WORD_COUNT,
} from "./config";

/**
 * RNG to help with randomized index selection.
 */
export type RNG = () => number;

/**
   * The optional override will likely be removed in the next sprint if not needed.
   */
export type WordGeneratorOptions = {
  /**
   * Optional word list override (useful for testing).
   */
  wordList?: string[];

  /**
   * Optional RNG override (just good for testing to see if you return the word at the expected index).
   */
  rng?: RNG;
};

/**
 * Default English word list.
 * Can be replaced with API or JSON later.
 */
const DEFAULT_WORD_LIST: string[] = [
  "communication",
  "capitalization",
  "punctuation",
  "documentation",
  "configuration",
  "understanding",
  "development",
  "application",
  "functionality",
  "performance",
  "integration",
  "responsibility",
  "maintainability",
];

/**
 * Returns a single random English word that meets length constraints.
 */
export function getRandomEnglishWord(
  options: WordGeneratorOptions = {}
): string {
  const wordList = options.wordList ?? DEFAULT_WORD_LIST;
  const rng = options.rng ?? Math.random;

  if (!Array.isArray(wordList) || wordList.length === 0) {
    throw new Error("Word list must be a non-empty array.");
  }

  const eligibleWords = wordList.filter(
    (word) =>
      word.length >= ENGLISH_WORD_LENGTH.MIN &&
      word.length <= ENGLISH_WORD_LENGTH.MAX
  );

  if (eligibleWords.length === 0) {
    throw new Error(
      `No English words found between ${ENGLISH_WORD_LENGTH.MIN} and ${ENGLISH_WORD_LENGTH.MAX} characters.`
    );
  }

  const index = pickRandomIndex(eligibleWords.length, rng);
  return eligibleWords[index];
}

/**
 * Returns multiple random English words by running getRandomEnglishWord() in a loop.
 * Enforces word count constraints.
 */
export function getRandomEnglishWords(
  count: number,
  options: WordGeneratorOptions = {}
): string[] {
  if (
    count < ENGLISH_WORD_COUNT.MIN ||
    count > ENGLISH_WORD_COUNT.MAX
  ) {
    throw new Error(
      `Word count must be between ${ENGLISH_WORD_COUNT.MIN} and ${ENGLISH_WORD_COUNT.MAX}.`
    );
  }

  const words: string[] = [];

  for (let i = 0; i < count; i++) {
    words.push(getRandomEnglishWord(options));
  }

  return words;
}

/**
 * Helper to pick random array index using RNG.
 */
function pickRandomIndex(length: number, rng: RNG): number {
  const value = rng();
  const clamped = Math.min(Math.max(value, 0), 0.999999999);
  return Math.floor(clamped * length);
}
