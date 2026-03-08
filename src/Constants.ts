export const EVOLUTIONS: Record<string, string[]> = {
  bulbasaur: ["bulbasaur", "ivysaur", "venusaur"],
  charmander: ["charmander", "charmeleon", "charizard"],
  squirtle: ["squirtle", "wartortle", "blastoise"],
};
export const STARTER_POKEMON = Object.keys(EVOLUTIONS);
export const LOCALSTORAGE_SAVE_KEY = "pikatypeData";