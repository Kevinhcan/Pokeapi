import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import ProtectedAuth from "./Components/auth/ProtectedAuth";
import { Pokemonid } from "./pages/Pokemonid";

function App() {
  return (
    <section>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedAuth />}>
          <Route path="/pokedex" element={<Pokedex />} />

          <Route path="/pokedex/:id" element={<Pokemonid />} />
        </Route>
      </Routes>
    </section>
  );
}

export default App;
