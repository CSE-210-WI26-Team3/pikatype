import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Levels from "../pages/Levels";
import Battle from "../pages/Battle";
import StarterSelect from "../pages/StarterSelect";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/levels" element={<Levels />} />
      <Route path="/starter" element={<StarterSelect />} />
      <Route path="/battle" element={<Battle />} />
    </Routes>
  );
}

export default AppRoutes;
