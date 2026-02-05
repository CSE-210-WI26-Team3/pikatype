import { useNavigate } from "react-router";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="title-box">
        <h1 className="title-text">PikaType</h1>
      </div>

      <div className="menu-buttons">
        <button className="menu-button" onClick={() => navigate("/levels")}>
          New Game
        </button>
        <button className="menu-button" onClick={() => navigate("/battle")}>
          Continue
        </button>
        <button className="menu-button">Options</button>
        <button className="menu-button">Save & Quit</button>
      </div>
    </div>
  );
}

export default Home;
