import "./Poké-Dex.css";
import Pokemon from "../../components/Pokemon/Pokemon";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Back from "../../components/Back/Back";

function PokéDex() {
  const { user } = useMoralis();
  const pokemons = useMoralisQuery(
    "Pokemon",
    (query) => query.equalTo("owner", user?.id),
    [user]
  ).data;

  return (
    <div className="pokedex">
      <Back />

      <h1>Poké-Dex</h1>

      <div className="pokedex__pokemons">
        {pokemons.map((pokemon) => (
          <Pokemon
            pokemonName={pokemon.attributes.pokemonName}
            image={pokemon.attributes.image}
            cp={pokemon.attributes.cp}
            type={pokemon.attributes.type}
            id={pokemon.id}
            key={pokemon.id}
          />
        ))}
      </div>
    </div>
  );
}

export default PokéDex;
