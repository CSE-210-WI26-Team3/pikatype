import { useNavigate } from "react-router";
import Button from "../../components/Button";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      <div className={styles.titleBox}>
        <h1 className={styles.titleText}>PikaType</h1>
      </div>

      <div className={styles.menuButtons}>
        <Button
          label="New Game"
          className={styles.menuButton}
          onClick={() => navigate("/levels")}
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
