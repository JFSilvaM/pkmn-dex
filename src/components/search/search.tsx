import { useEffect, useMemo, useState } from "react";
import "./search.scss";

interface PokemonList {
  name: string;
}

const Search = () => {
  const [value, setValue] = useState<string>("");
  const [pokemonList, setPokemonList] = useState<PokemonList[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonList | null>(
    null,
  );

  const suggestions = useMemo(() => {
    if (!value) return [];

    return pokemonList
      .filter((pkmn) => pkmn.name.startsWith(value.toLowerCase()))
      .slice(0, 10);
  }, [value, pokemonList]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1300")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
  }, []);

  const selectPokemon = async (name: string) => {
    setValue(name);

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    setSelectedPokemon(data);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar un Pokémon..."
        className="search-input"
      />

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((pkmn) => (
            <li key={pkmn.name} onClick={() => selectPokemon(pkmn.name)}>
              {pkmn.name}
            </li>
          ))}
        </ul>
      )}

      {selectedPokemon && <p>Seleccionado: {selectedPokemon.name}</p>}
    </div>
  );
};

export default Search;
