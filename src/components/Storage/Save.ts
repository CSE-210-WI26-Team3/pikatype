type SaveData = {
    completedLevels: boolean[];
    starter: string | null;
};

export class Save {
    private static readonly SAVE_KEY = "pikatypeData";
    private readonly numLevels: number;
    private data: SaveData;

    constructor(numLevels: number) {
        this.numLevels = numLevels;
        this.data = this.createDefaults();
        this.load();
    }

    isCompleted(level: number): boolean {
        return this.data.completedLevels[level - 1];
    }

    complete(level: number) {
        this.data.completedLevels[level - 1] = true;
    }

    getStarter(): string | null {
        return this.data.starter;
    }

    setStarter(starter: string) {
        this.data.starter = starter;
    }

    save() {
        localStorage.setItem(Save.SAVE_KEY, JSON.stringify(this.data));
    }

    load() {
        const rawData = localStorage.getItem(Save.SAVE_KEY);
        if (rawData === null) {
            this.data = this.createDefaults();
            return;
        }

        try {
            const parsed = JSON.parse(rawData) as Partial<SaveData>;
            this.data = {
                starter: parsed.starter !== null && parsed.starter !== undefined
                    ? parsed.starter : this.data.starter,
                completedLevels: parsed.completedLevels ?? this.data.completedLevels,
            };
        } catch {
            this.data = this.createDefaults();
        }
    }

    clear() {
        this.data = this.createDefaults();
    }

    private createDefaults(): SaveData {
        return {
            completedLevels: Array(this.numLevels).fill(false),
            starter: null,
        };
    }
}
