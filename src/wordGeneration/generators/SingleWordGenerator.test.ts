import { SingleWordGenerator } from "./SingleWordGenerator";

const MOCK_WORDS = ["apple", "banana", "cherry"];

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

describe("SingleWordGenerator", () => {
  it("returns a single word from the word file", async () => {
    const generator = new SingleWordGenerator();
    const word = await generator.getTypingPrompt();

    expect(MOCK_WORDS).toContain(word);
  });

  it("returns a non-empty string", async () => {
    const generator = new SingleWordGenerator();
    const word = await generator.getTypingPrompt();

    expect(typeof word).toBe("string");
    expect(word.length).toBeGreaterThan(0);
  });

  it("throws an error if the word file is empty", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      text: async () => "",
    } as Response);

    const generator = new SingleWordGenerator();

    await expect(generator.getTypingPrompt())
      .rejects.toThrow("Word file is empty.");
  });

  it("throws an error if fetch fails", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
    } as Response);

    const generator = new SingleWordGenerator();

    await expect(generator.getTypingPrompt())
      .rejects.toThrow("Failed to load word file");
  });
});