import { Save } from "./Save";

let store: Record<string, string> = {};

beforeEach(() => {
  store = {};
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(
    (key: string) => store[key] ?? null,
  );
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(
    (key: string, value: string) => { store[key] = value; },
  );
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

  it("marks a level as completed", () => {
    const save = new Save(3);
    save.complete(2);

    expect(save.isCompleted(1)).toBe(false);
    expect(save.isCompleted(2)).toBe(true);
    expect(save.isCompleted(3)).toBe(false);
  });

  it("sets and gets the starter", () => {
    const save = new Save(3);
    save.setStarter("pikachu");

    expect(save.getStarter()).toBe("pikachu");
  });

  it("persists data to localStorage on save", () => {
    const save = new Save(3);
    save.complete(1);
    save.setStarter("bulbasaur");
    save.save();

    const stored = JSON.parse(store["pikatypeData"]);
    expect(stored.completedLevels).toEqual([true, false, false]);
    expect(stored.starter).toBe("bulbasaur");
  });

  it("loads persisted data from localStorage", () => {
    store["pikatypeData"] = JSON.stringify({
      completedLevels: [false, true, false],
      starter: "charmander",
    });

    const save = new Save(3);

    expect(save.isCompleted(1)).toBe(false);
    expect(save.isCompleted(2)).toBe(true);
    expect(save.isCompleted(3)).toBe(false);
    expect(save.getStarter()).toBe("charmander");
  });

  it("falls back to defaults when localStorage is empty", () => {
    const save = new Save(3);

    expect(save.isCompleted(1)).toBe(false);
    expect(save.getStarter()).toBeNull();
  });

  it("falls back to defaults when localStorage has invalid JSON", () => {
    store["pikatypeData"] = "not valid json";

    const save = new Save(3);

    expect(save.isCompleted(1)).toBe(false);
    expect(save.getStarter()).toBeNull();
  });

  it("persists data across multiple Save instances", () => {
    const first = new Save(3);
    first.complete(1);
    first.complete(3);
    first.setStarter("pikachu");
    first.save();

    const second = new Save(3);

    expect(second.isCompleted(1)).toBe(true);
    expect(second.isCompleted(2)).toBe(false);
    expect(second.isCompleted(3)).toBe(true);
    expect(second.getStarter()).toBe("pikachu");
  });

  it("accumulates changes across multiple Save instances", () => {
    const first = new Save(3);
    first.complete(1);
    first.save();

    const second = new Save(3);
    second.complete(2);
    second.setStarter("charmander");
    second.save();

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
  });
});
