import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const basename = process.env.PUBLIC_URL || "/";

  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
