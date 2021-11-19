import "./Home.css";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import Logout from "../../components/Logout/Logout";
import { useNavigate } from "react-router-dom";

// toast imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Home() {
  const navigate = useNavigate();

  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonType, setPokemonType] = useState("fire");
  const [pokemonCp, setPokemonCp] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");

  const addPokemon = () => {
    const Pokemon = Moralis.Object.extend("Pokemon");
    const pokemon = new Pokemon();

    pokemon
      .save({
        cp: Number(pokemonCp),
        pokemonName: pokemonName,
        type: pokemonType,
        owner: user.id,
        image: pokemonImage,
      })
      .then(
        (pokemon) => {
          toast.success("Added a pokemon", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setPokemonName("");
          setPokemonCp("");
          setPokemonType("");
          setPokemonImage("");
        },
        (error) => {
          toast.error("Failed to add a pokemon", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      );
  };

  return (
    <div className="home">
      {isAuthenticated ? (
        <div>
          <Logout logout={logout} />

          <h1>Add pokemon</h1>

          <input
            type="text"
            placeholder="Enter pokemon's name"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            required={true}
          />

          <label htmlFor="type">Enter pokemon's type</label>

          <select
            name="type"
            id="type"
            onChange={(e) => setPokemonType(e.target.value)}
          >
            <option value="fire">Fire</option>

            <option value="electric">Electric</option>

            <option value="water">Water</option>

            <option value="grass">Grass</option>
          </select>

          <input
            type="text"
            placeholder="Enter pokemon's cp"
            value={pokemonCp}
            onChange={(e) => setPokemonCp(e.target.value)}
            required={true}
          />

          <input
            type="text"
            placeholder="Enter pokemon's image URL"
            value={pokemonImage}
            onChange={(e) => setPokemonImage(e.target.value)}
            required={true}
          />

          <button
            onClick={addPokemon}
            disabled={
              !pokemonName ||
              !pokemonCp ||
              !pokemonImage ||
              !pokemonType ||
              pokemonName[0] === " " ||
              pokemonCp[0] === " " ||
              pokemonImage[0] === " " ||
              pokemonType[0] === " "
            }
          >
            Add pokemon
          </button>

          <button onClick={() => navigate("/Poke-Dex")}>Poké-Dex &rarr;</button>
        </div>
      ) : (
        <div>
          <h1>Poké-Dex</h1>

          <button
            onClick={() => {
              authenticate({ provider: "metamask" });
            }}
          >
            Sign in with MetaMask
          </button>

          <button
            onClick={() => {
              authenticate({ provider: "walletconnect" });
            }}
          >
            Sign in with WalletConnect
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
