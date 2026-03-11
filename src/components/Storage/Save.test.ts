import { Save } from "./Save";

let store: Record<string, string> = {};

beforeEach(() => {
  store = {};
  jest
    .spyOn(Storage.prototype, "getItem")
    .mockImplementation((key: string) => store[key] ?? null);
  jest
    .spyOn(Storage.prototype, "setItem")
    .mockImplementation((key: string, value: string) => {
      store[key] = value;
    });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Save", () => {
  it("initializes with all levels incomplete", () => {
    const save = new Save(3);

    expect(save.isCompleted(1)).toBe(false);
    expect(save.isCompleted(2)).toBe(false);
    expect(save.isCompleted(3)).toBe(false);
  });

  it("initializes with starter as null", () => {
    const save = new Save(3);

    expect(save.getStarter()).toBeNull();
  });

  it("initializes with audio not muted", () => {
    const save = new Save(3);

    expect(save.getAudioMuted()).toBe(false);
  });

  it("initializes with volume at 50%", () => {
    const save = new Save(3);

    expect(save.getVolume()).toBe(0.5);
  });

  it("marks a level as completed", () => {
    const save = new Save(3);
    save.complete(2);

    expect(save.isCompleted(1)).toBe(false);
    expect(save.isCompleted(2)).toBe(true);
    expect(save.isCompleted(3)).toBe(false);
  });

  it("sets and gets the starter", () => {
    const save = new Save(3);
    save.setStarter("charmander");

    expect(save.getStarter()).toBe("charmander");
  });

  it("saves and gets the volume", () => {
    const save = new Save(3);
    save.setVolume(0.4);

    expect(save.getVolume()).toBe(0.4);
  });

  it("saves and gets mute volume", () => {
    const save = new Save(3);
    save.setAudioMuted(true);

    expect(save.getAudioMuted()).toBe(true);
  });

  it("persists data to localStorage on save", () => {
    const save = new Save(3);
    save.complete(1);
    save.setStarter("bulbasaur");
    save.setVolume(0.1);
    save.setAudioMuted(true);

    const stored = JSON.parse(store["pikatypeData"]);
    expect(stored.completedLevels).toEqual([true, false, false]);
    expect(stored.starter).toBe("bulbasaur");
    expect(stored.volume).toBe(0.1);
    expect(stored.audioMuted).toBe(true);
  });

  it("loads persisted data from localStorage", () => {
    store["pikatypeData"] = JSON.stringify({
      completedLevels: [false, true, false],
      starter: "charmander",
      volume: 0.7,
      audioMuted: true,
    });

    const save = new Save(3);

    expect(save.isCompleted(1)).toBe(false);
    expect(save.isCompleted(2)).toBe(true);
    expect(save.isCompleted(3)).toBe(false);
    expect(save.getStarter()).toBe("charmander");
    expect(save.getVolume()).toBe(0.7);
    expect(save.getAudioMuted()).toBe(true);
  });

  it("falls back to defaults when localStorage is empty", () => {
    const save = new Save(3);

    expect(save.isCompleted(1)).toBe(false);
    expect(save.getStarter()).toBeNull();
    expect(save.getAudioMuted()).toBe(false);
    expect(save.getVolume()).toBe(0.5);
  });

  it("falls back to defaults when localStorage has invalid JSON", () => {
    store["pikatypeData"] = "not valid json";

    const save = new Save(3);

    expect(save.isCompleted(1)).toBe(false);
    expect(save.getStarter()).toBeNull();
    expect(save.getAudioMuted()).toBe(false);
    expect(save.getVolume()).toBe(0.5);
  });

  it("invalid starter reset to default", () => {
    store["pikatypeData"] = JSON.stringify({
      completedLevels: [true, true, false],
      starter: "pikachu",
    });

    const save = new Save(3);

    expect(save.isCompleted(1)).toBe(true);
    expect(save.isCompleted(2)).toBe(true);
    expect(save.isCompleted(3)).toBe(false);
    expect(save.getStarter()).toBeNull();
  });

  it("invalid completedLevels reset to default", () => {
    store["pikatypeData"] = JSON.stringify({
      completedLevels: [true, "test", false],
      starter: "charmander",
    });

    const save = new Save(3);

    expect(save.isCompleted(1)).toBe(false);
    expect(save.isCompleted(2)).toBe(false);
    expect(save.isCompleted(3)).toBe(false);
    expect(save.getStarter()).toBe("charmander");
  });

  it("persists data across multiple Save instances", () => {
    const first = new Save(3);
    first.complete(1);
    first.complete(3);
    first.setStarter("charmander");

    const second = new Save(3);

    expect(second.isCompleted(1)).toBe(true);
    expect(second.isCompleted(2)).toBe(false);
    expect(second.isCompleted(3)).toBe(true);
    expect(second.getStarter()).toBe("charmander");
  });

  it("accumulates changes across multiple Save instances", () => {
    const first = new Save(3);
    first.complete(1);

    const second = new Save(3);
    second.complete(2);
    second.setStarter("charmander");

    const third = new Save(3);

    expect(third.isCompleted(1)).toBe(true);
    expect(third.isCompleted(2)).toBe(true);
    expect(third.isCompleted(3)).toBe(false);
    expect(third.getStarter()).toBe("charmander");
  });

  it("resets data on clear", () => {
    const save = new Save(3);
    save.complete(1);
    save.setStarter("squirtle");
    save.clear();

    expect(save.isCompleted(1)).toBe(false);
    expect(save.getStarter()).toBeNull();
    expect(save.getAudioMuted()).toBe(false);
    expect(save.getVolume()).toBe(0.5);
  });

  it("throws when numLevels is invalid", () => {
    expect(() => new Save(-1)).toThrow(
      "numLevels must be a non-negative integer",
    );
    expect(() => new Save(5.3)).toThrow(
      "numLevels must be a non-negative integer",
    );
  });

  it("throws when complete is called with an out-of-bounds level", () => {
    const save = new Save(3);

    expect(() => save.complete(4)).toThrow("Level 4 does not exist");
    expect(() => save.complete(0)).toThrow("Level 0 does not exist");
    expect(() => save.isCompleted(1)).not.toThrow();
  });

  it("throws when isCompleted is called with an out-of-bounds level", () => {
    const save = new Save(3);

    expect(() => save.isCompleted(4)).toThrow("Level 4 does not exist");
    expect(() => save.isCompleted(0)).toThrow("Level 0 does not exist");
    expect(() => save.isCompleted(1)).not.toThrow();
  });

  it("throws when invalid starter pokemon is set", () => {
    const save = new Save(3);
    expect(() => save.setStarter("pikachu")).toThrow(
      "pikachu is not a valid starter pokemon",
    );
  });

  it("throws when invalid volume is set", () => {
    const save = new Save(3);

    expect(() => save.setVolume(-1)).toThrow(
      "Volume must be a decimal between 0.0 and 1.0",
    );

    expect(() => save.setVolume(1.1)).toThrow(
      "Volume must be a decimal between 0.0 and 1.0",
    );
  });
});
