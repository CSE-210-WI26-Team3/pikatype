import { useNavigate } from "react-router";
import Button from "../../components/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Pikatype</h2>
      <Button label="Levels" onClick={() => navigate("/levels")} />
      <Button label="Battle" onClick={() => navigate("/battle")} />
    </div>
  );
}

export default Home;
