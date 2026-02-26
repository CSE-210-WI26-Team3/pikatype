import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Save } from "../../components/Storage/Save";
import { STARTER_POKEMON } from "../../Constants";
import { POKEMON_DATA } from "../../data/pokemon";
import styles from "./StarterSelect.module.css";

const NUM_LEVELS = 3;

function StarterSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [save] = useState(() => new Save(NUM_LEVELS));

  useEffect(() => {
    const existingStarter = save.getStarter();
    if (existingStarter) {
      setSelected(existingStarter);
    }
  }, [save]);

  const handleConfirm = () => {
    if (selected) {
      save.setStarter(selected);
      navigate("/levels");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.title}>Choose your Starter!</h1>
      </div>

      <div className={styles.cardsRow}>
        {STARTER_POKEMON.map((pokemonId) => {
          const pokemon = POKEMON_DATA[pokemonId];
          return (
            <div
              key={pokemonId}
              className={`${styles.card} ${selected === pokemonId ? styles.selected : ""}`}
              onClick={() => setSelected(pokemonId)}
            >
              <img
                className={styles.pokemonImage}
                src={process.env.PUBLIC_URL + `/img/pokemon/${pokemonId}.png`}
                alt={pokemon.name}
              />
              <p className={styles.pokemonName}>{pokemon.name}</p>
              <span
                className={styles.typeBadge}
                style={{ backgroundColor: pokemon.typeColor }}
              >
                {pokemon.type}
              </span>
            </div>
          );
        })}
      </div>

      <button
        className={`${styles.confirmButton} ${!selected ? styles.confirmButtonDisabled : ""}`}
        onClick={handleConfirm}
        disabled={!selected}
      >
        {selected ? "I choose you!" : "Pick a Pokemon"}
      </button>
    </div>
  );
}

export default StarterSelect;
