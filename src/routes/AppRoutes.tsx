import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Levels from "../pages/Levels";
import Battle from "../pages/Battle";
import StarterSelect from "../pages/StarterSelect";
import Options from "../pages/Options/Options";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/levels" element={<Levels />} />
      <Route path="/starter" element={<StarterSelect />} />
      <Route path="/battle" element={<Battle />} />
      <Route path="/options" element={<Options />} />
    </Routes>
  );
}

export default AppRoutes;
