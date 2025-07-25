import { useState } from "react";
import { type PokemonNameAndUrl } from "../types/PokemonData";

interface AutoCompleteProps {
  allPokemons: PokemonNameAndUrl[];
  setDisplayedPokemons: React.Dispatch<
    React.SetStateAction<PokemonNameAndUrl[]>
  >;
}

export const AutoComplete = ({
  allPokemons,
  setDisplayedPokemons,
}: AutoCompleteProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterNames = (input: string) => {
    const value = input.toLowerCase();
    return value
      ? allPokemons.filter((pokemon) => pokemon.name.includes(value))
      : [];
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let text = searchTerm.trim();
    setDisplayedPokemons(filterNames(text));
    setSearchTerm("");
  };

  const checkEqualName = (input: string) => {
    const filteredArray = filterNames(input);
    // 검색하는 것에 정확히 일치하는 포켓몬 이름이 있으면 autoComplete를 사용하지 않음
    return filteredArray[0]?.name === input ? [] : filteredArray;
  };

  return (
    <div className="relative z-50">
      <form
        onSubmit={handleSubmit}
        className="relative flex justify-center items-center w-[20.5rem] h-6 rouded-lg m-auto"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-xs w-[20.5rem] h-6 px-2 py-1 bg-[hsl(214,13%,47%)] rounded-lg text-gray-300 text-center"
          placeholder="포켓몬 이름을 입력하세요"
        />
        <button
          type="submit"
          className="text-xs bg-slate-900 text-slate-300 w-[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700"
        >
          검색
        </button>
      </form>
      {checkEqualName(searchTerm).length > 0 && (
        <div
          className={
            "w-full flex bottom-0 h-0 flex-col absolute justify-center items-center translate-y-2"
          }
        >
          <div
            className={
              "w-0 h-0 bottom-0 border-x-transparent border-x-8 border-b-[8px] border-gray-700 -translate-y-1/2"
            }
          ></div>
          <ul
            className={
              "w-40 max-h-[134px] py-1 bg-gray-700 rounded-lg absolute top-0 overflow-auto scrollbar-none"
            }
          >
            {checkEqualName(searchTerm).map((e, i) => (
              <li key={`button-${i}`}>
                <button
                  onClick={() => setSearchTerm(e.name)}
                  className={
                    "text-base w-full hover:bg-gray-600 p-[2px] text-gray-100"
                  }
                >
                  {e.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
