import { SentenceGenerator } from "./SentenceGenerator";

const MOCK_SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "She sells seashells by the seashore every summer.",
  "Practice makes perfect when you dedicate time each day.",
];

let fetchSpy: jest.SpyInstance;

beforeEach(() => {
  fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    text: async () => MOCK_SENTENCES.join("\n"),
  } as Response);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("SentenceGenerator", () => {
  it("returns a sentence from the sentence file", async () => {
    const generator = new SentenceGenerator();
    const sentence = await generator.getTypingPrompt();

    expect(MOCK_SENTENCES).toContain(sentence);
  });

  it("returns a non-empty string", async () => {
    const generator = new SentenceGenerator();
    const sentence = await generator.getTypingPrompt();

    expect(typeof sentence).toBe("string");
    expect(sentence.length).toBeGreaterThan(0);
  });

  it("loads the sentence file only once across multiple calls", async () => {
    const generator = new SentenceGenerator();

    await generator.getTypingPrompt();
    await generator.getTypingPrompt();
    await generator.getTypingPrompt();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("throws an error if the sentence file is empty", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      text: async () => "",
    } as Response);

    const generator = new SentenceGenerator();

    await expect(generator.getTypingPrompt()).rejects.toThrow(
      "Sentence file is empty."
    );
  });

  it("throws an error if the sentence file contains only whitespace", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      text: async () => "   \n   \n   ",
    } as Response);

    const generator = new SentenceGenerator();

    await expect(generator.getTypingPrompt()).rejects.toThrow(
      "Sentence file is empty."
    );
  });

  it("throws an error if fetch fails", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
    } as Response);

    const generator = new SentenceGenerator();

    await expect(generator.getTypingPrompt()).rejects.toThrow(
      "Failed to load sentence file"
    );
  });

  it("trims whitespace from sentences", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      text: async () => "  Hello world.  \n  Goodbye world.  ",
    } as Response);

    const generator = new SentenceGenerator();
    const sentence = await generator.getTypingPrompt();

    expect(sentence).not.toMatch(/^\s|\s$/);
  });

  it("returns different sentences over multiple calls", async () => {
    const generator = new SentenceGenerator();

    const results = new Set<string>();
    for (let i = 0; i < 20; i++) {
      results.add(await generator.getTypingPrompt());
    }

    expect(results.size).toBeGreaterThan(1);
  });
});
