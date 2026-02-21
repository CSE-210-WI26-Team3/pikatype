import { useMemo } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import { Save } from "../../components/Storage/Save";
import styles from "./Home.module.css";

const NUM_LEVELS = 3;

function Home() {
  const navigate = useNavigate();
  const save = useMemo(() => new Save(NUM_LEVELS), []);

  const handleNewGame = () => {
    const hasStarter = save.getStarter() !== null;
    if (hasStarter) {
      navigate("/levels");
    } else {
      navigate("/starter");
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.titleBox}>
        <h1 className={styles.titleText}>PikaType</h1>
      </div>

      <div className={styles.menuButtons}>
        <Button
          label="New Game"
          className={styles.menuButton}
          onClick={handleNewGame}
        />
        <Button
          label="Continue"
          className={styles.menuButton}
          onClick={() => navigate("/battle")}
        />
        <Button label="Options" className={styles.menuButton} />
        <Button label="Save & Quit" className={styles.menuButton} />
      </div>
    </div>
  );
}

export default Home;
