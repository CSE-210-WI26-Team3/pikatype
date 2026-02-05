import { useNavigate } from "react-router";
import Button from "../../components/Button";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="title-box">
        <h1 className="title-text">PikaType</h1>
      </div>

      <div className="menu-buttons">
        <Button
          label="New Game"
          className="menu-button"
          onClick={() => navigate("/levels")}
        />
        <Button
          label="Continue"
          className="menu-button"
          onClick={() => navigate("/battle")}
        />
        <Button label="Options" className="menu-button" />
        <Button label="Save & Quit" className="menu-button" />
      </div>
    </div>
  );
}

export default Home;
