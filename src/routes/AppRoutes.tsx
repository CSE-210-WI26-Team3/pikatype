import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Levels from "../pages/Levels";
import Battle from "../pages/Battle";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/levels" element={<Levels />} />
      <Route path="/battle" element={<Battle />} />
    </Routes>
  );
}

export default AppRoutes;
