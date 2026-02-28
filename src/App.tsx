import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter basename={process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : ""}>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
