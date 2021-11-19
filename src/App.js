import Logout from "./components/Logout/Logout";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokéDex from "./pages/Poké-Dex/Poké-Dex";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="Poke-Dex" element={<PokéDex />} />
      </Routes>
    </Router>
  );
}

export default App;
