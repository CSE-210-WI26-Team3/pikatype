import { MultiWordGenerator } from "./MultiWordGenerator";

const MOCK_WORDS = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
];

let fetchSpy: jest.SpyInstance;

beforeEach(() => {
  fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    text: async () => MOCK_WORDS.join("\n"),
  } as Response);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("MultiWordGenerator", () => {
  it("returns a string of space-separated words within the specified range", async () => {
    const generator = new MultiWordGenerator(2, 4);
    const result = await generator.getTypingPrompt();

    const words = result.split(" ");
    expect(typeof result).toBe("string");
    expect(words.length).toBeGreaterThanOrEqual(2);
    expect(words.length).toBeLessThanOrEqual(4);
  });

  it("returns only words from the word file", async () => {
    const generator = new MultiWordGenerator(3, 3);
    const result = await generator.getTypingPrompt();

    const words = result.split(" ");
    words.forEach((word) => {
      expect(MOCK_WORDS).toContain(word);
    });
  });

  it("does not return duplicate words", async () => {
    const generator = new MultiWordGenerator(3, 3);
    const result = await generator.getTypingPrompt();

    const words = result.split(" ");
    const uniqueWords = new Set(words);

    expect(uniqueWords.size).toBe(words.length);
  });

  it("throws an error if minWords > maxWords", () => {
    expect(() => new MultiWordGenerator(5, 2))
      .toThrow("Minimum word count cannot exceed maximum word count.");
  });

  it("throws an error if bounds are negative", () => {
    expect(() => new MultiWordGenerator(-1, 5))
      .toThrow("non-negative");
  });

  it("throws an error if not enough unique words exist", async () => {
    const generator = new MultiWordGenerator(10, 10);

    await expect(generator.getTypingPrompt())
      .rejects.toThrow("Cannot generate more than");
  });
});