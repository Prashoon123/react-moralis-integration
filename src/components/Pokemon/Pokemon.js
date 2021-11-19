import Moralis from "moralis";
import { useEffect, useState } from "react";
import "./Pokemon.css";

function Pokemon({ pokemonName, type, image, cp, id }) {
  const Pokemon = Moralis.Object.extend("Pokemon");

  const [typeEmoji, setTypeEmoji] = useState("");

  const deletePokemon = () => {
    const sure = window.confirm(
      "Are you sure you want to delete this pokemon?"
    );

    if (!sure) return;

    const pokemon = new Pokemon();
    pokemon.id = id;

    pokemon.destroy();

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    switch (type) {
      case "fire":
        setTypeEmoji("🔥");
        break;
      case "water":
        setTypeEmoji("💧");
        break;
      case "electric":
        setTypeEmoji("⚡");
        break;
      case "grass":
        setTypeEmoji("🍃");
        break;
      default:
        setTypeEmoji("");
        break;
    }
  }, [type]);

  return (
    <div className="pokemon">
      <img src={image} alt={pokemonName} />
      <h2>{pokemonName}</h2>
      <p>{typeEmoji}</p>

      <svg
        onClick={deletePokemon}
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: 30, width: 30, cursor: "pointer" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
  );
}

export default Pokemon;
