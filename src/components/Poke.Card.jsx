import axios from "axios";
import { useEffect, useState } from "react";

const PokeCard = ({ url, name }) => {
  const [pokemon, setPokemon] = useState(true);

  useEffect(() => {
    fetchPokeDetailData();
  }, [pokemon]);

  async function fetchPokeDetailData() {
    try {
      const response = await axios.get(url);
      const data = formatPokemonData(response.data);
      console.log(data);
      setPokemon(data);
    } catch (error) {
      console.error(error);
    }
  }

  function formatPokemonData(params) {
    const { id, name, types } = params;
    const pokeData = {
      id,
      name,
      types: types[0].type.name,
    };
    return pokeData;
  }

  return <div>PokeCard</div>;
};

export default PokeCard;
