import { Save } from "../components/Storage/Save";
import { EVOLUTIONS } from "../Constants";
import { LevelConfig } from "../pages/Levels/LevelConfigs";

export const POKEMON_DATA: Record<
  string,
  { name: string; type: string; typeColor: string }
> = {
  bulbasaur: {
    name: "Bulbasaur",
    type: "Grass",
    typeColor: "#78c850",
  },
  charmander: {
    name: "Charmander",
    type: "Fire",
    typeColor: "#f08030",
  },
  squirtle: {
    name: "Squirtle",
    type: "Water",
    typeColor: "#6890f0",
  },
};

export function getPokemonByLevel(save: Save, level: LevelConfig) {
  const starter = save.getStarter();
  if (starter === null) {
    return "bulbasaur";
  }

  return EVOLUTIONS[starter][level.evolution];
}
