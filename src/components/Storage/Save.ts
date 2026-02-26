import { LOCALSTORAGE_SAVE_KEY, STARTER_POKEMON } from "../../Constants";

type SaveData = {
  completedLevels: boolean[];
  starter: string | null;
  volume: number;
  audioMuted: boolean;
};

export class Save {
  private readonly numLevels: number;
  private data: SaveData;

  constructor(numLevels: number) {
    if (!Number.isInteger(numLevels) || numLevels < 0) {
      throw new Error("numLevels must be a non-negative integer");
    }

    this.numLevels = numLevels;
    this.data = this.createDefaults();
    this.load();
  }

  /**
   * @param level 1-indexed level
   */
  isCompleted(level: number): boolean {
    // Level is 1-indexed
    if (!Number.isInteger(level) || level <= 0 || level > this.numLevels) {
      throw new Error(`Level ${level} does not exist`);
    }

    return this.data.completedLevels[level - 1];
  }

  /**
   * @param level 1-indexed level
   */
  complete(level: number) {
    // Level is 1-indexed
    if (!Number.isInteger(level) || level <= 0 || level > this.numLevels) {
      throw new Error(`Level ${level} does not exist`);
    }

    this.data.completedLevels[level - 1] = true;
    this.save();
  }

  getStarter(): string | null {
    return this.data.starter;
  }

  setStarter(starter: string) {
    if (!STARTER_POKEMON.includes(starter)) {
      throw new Error(`${starter} is not a valid starter pokemon`);
    }
    this.data.starter = starter;
    this.save();
  }

  getVolume(): number {
    return this.data.volume || 0.5;
  }

  setVolume(volume: number) {
    if (volume < 0 || volume > 1) {
      throw new Error("Volume must be a decimal between 0.0 and 1.0");
    }

    this.data.volume = volume;
    this.save();
  }

  getAudioMuted(): boolean {
    return this.data.audioMuted || false;
  }

  setAudioMuted(audioMuted: boolean) {
    this.data.audioMuted = audioMuted;
    this.save();
  }

  clear() {
    this.data = this.createDefaults();
    localStorage.removeItem(LOCALSTORAGE_SAVE_KEY);
  }

  private save() {
    localStorage.setItem(LOCALSTORAGE_SAVE_KEY, JSON.stringify(this.data));
  }

  private load() {
    const rawData = localStorage.getItem(LOCALSTORAGE_SAVE_KEY);
    if (rawData === null) {
      this.data = this.createDefaults();
      return;
    }

    try {
      const parsedData = JSON.parse(rawData) as Partial<SaveData>;

      this.data = {
        starter: this.parseStarter(parsedData.starter) ?? this.data.starter,
        completedLevels:
          this.parseCompletedLevels(parsedData.completedLevels) ??
          this.data.completedLevels,
        audioMuted: this.parseAudioMuted(parsedData.audioMuted),
        volume: this.parseVolume(parsedData.volume),
      };
    } catch {
      this.data = this.createDefaults();
    }
  }

  private parseStarter(starter: unknown) {
    if (typeof starter === "string" && STARTER_POKEMON.includes(starter)) {
      return starter;
    }

    return null;
  }

  private parseCompletedLevels(completedLevels: unknown) {
    if (
      Array.isArray(completedLevels) &&
      completedLevels.length === this.numLevels &&
      completedLevels.every((level) => typeof level === "boolean")
    ) {
      return completedLevels;
    }

    return null;
  }

  private parseVolume(volume: unknown) {
    if (
      typeof volume === "number" &&
      !Number.isInteger(volume) &&
      volume >= 0 &&
      volume <= 1
    ) {
      return volume;
    }

    return 0.5;
  }

  private parseAudioMuted(audioMuted: unknown) {
    if (typeof audioMuted === "boolean") {
      return audioMuted;
    }

    return false;
  }

  private createDefaults(): SaveData {
    return {
      completedLevels: Array(this.numLevels).fill(false),
      starter: null,
      audioMuted: false,
      volume: 0.5,
    };
  }
}
