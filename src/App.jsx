import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import PokeCard from "./components/Poke.Card";

function App() {
  const [pokemons, setPokemons] = useState([]);

  const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

  useEffect(() => {
    fetchPokeData();
  }, []);

  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url);
      setPokemons(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        Input form
      </header>
      <section className="pt-6 flex flex-col justify-center items-center overflow-auto z-0"></section>
      <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl"></div>
      {pokemons.length > 0 ? (
        pokemons.map(({ url, name }, index) => (
          <PokeCard key={url} url={url} name={name} />
        ))
      ) : (
        <h2 className="font-medium text-lg text-slate-900 mb-1">
          포켓몬이 없습니다.
        </h2>
      )}
    </article>
  );
}

export default App;
