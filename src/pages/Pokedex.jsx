import { useEffect, useState } from "react";
import Heeader from "../Components/pokedex/Heeader";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonCard from "../Components/pokedex/PokemonCard";


const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const nameTrainer = useSelector((store) => store.nameTrainer);
  const handleSubmmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );

  const pagination = () => {
    /* CANTIDAD DE POKEMONS POR PAGINA */
    const POKEMONS_PER_PAGE = 12;

    /* Pokemons que se van a mostrat en la pg actual */

    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);

    /* Ultima pagina */
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1;

    /* Bloque actual */
    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    /* Paginas que se van a mostrar en el bloque actual */

    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }
    return { pokemonInPage, lastPage, pagesInBlock };
  };

  const { lastPage, pagesInBlock, pokemonInPage } = pagination();

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  console.log(pagesInBlock);

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";

    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name);
        setTypes(newTypes);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/type/${currentType}`;

    if (currentType) {
      axios
        .get(URL)
        .then((res) => {
          const pokemonsByType = res.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setPokemons(pokemonsByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemonName, currentType]);

  return (
    <section
      className={`bg-fixed bg-center bg-no-repeat bg-cover font-mono min-h-screen bg-[url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a11de91a-5e1b-447c-9066-64185f3c8cbb/d7a42h1-39a19868-7cd3-47af-b557-118890a140dc.jpg/v1/fill/w_1192,h_670,q_70,strp/_updated__pokeball_wallpaper_by_rushetafan_d7a42h1-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvYTExZGU5MWEtNWUxYi00NDdjLTkwNjYtNjQxODVmM2M4Y2JiXC9kN2E0MmgxLTM5YTE5ODY4LTdjZDMtNDdhZi1iNTU3LTExODg5MGExNDBkYy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.5XTBE-aavwhrFjzSGtQc0skSV9q26BoP7a9JAhcQfkc")]`}
    >
      <Heeader />

      <section className="py-6 px-2 items-center justify-center grid gap-1">
        <h3 className="text-white text-xl">
          Welcome {nameTrainer}, here you can find you favorite pokemon{" "}
        </h3>

        <form onSubmit={handleSubmmit}>
          <div>
            <input
              className=" text-center jus px-4 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
              id="pokemonName"
              type="text"
              placeholder="Search your pokemon"
            />
            <button>Search</button>
          </div>

          <select
            className="mt-2 rounded-sm text-center h-6 w-24 capitalize"
            onChange={(e) => setCurrentType(e.target.value)}
          >
            <option value="">All</option>
            {types.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </form>
      </section>

      {/* Paginación */}
      <ul className="flex gap-3 justify-center py-4 mt-4 px-2 flex-wrap text-xl ">
        {/* Primera pagina */}
        <li
          onClick={() => setCurrentPage(1)}
          className="bx bx-first-page text-2xl rounded-md p-3 bg-black font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Pagina anterior */}
        <li
          onClick={handleClickPreviusPage}
          className="bx bx-caret-left text-2xl p-3 rounded-md bg-black font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Lista de paginas */}
        {pagesInBlock.map((numberPage) => (
          <li
            onClick={() => {
              setCurrentPage(numberPage);
            }}
            className={`p-3 bg-black font-bold text-white rounded-m cursor-pointer rounded-md ${
              numberPage === currentPage && "bg-gray-500"
            } `}
            key={numberPage}
          >
            {numberPage}
          </li>
        ))}

        {/* Pagina siguiente */}
        <li
          onClick={handleClickNextPage}
          className="bx bx-caret-right text-2xl p-3 rounded-md bg-black font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Ultima pagina */}
        <li
          onClick={() => setCurrentPage(lastPage)}
          className=" bx bx-last-page text-2xl p-3 rounded-md bg-black font-bold text-white rounded-m cursor-pointer"
        ></li>
      </ul>

      <section className="px-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10 m-16 ">
        {pokemonInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>

      {/* Paginación */}
      <ul className="flex gap-3 justify-center pb-8  px-2 flex-wrap text-xl ">
        {/* Primera pagina */}
        <li
          onClick={() => setCurrentPage(1)}
          className="bx bx-first-page text-2xl rounded-md p-3 bg-black font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Pagina anterior */}
        <li
          onClick={handleClickPreviusPage}
          className="bx bx-caret-left text-2xl p-3 rounded-md bg-black font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Lista de paginas */}
        {pagesInBlock.map((numberPage) => (
          <li
            onClick={() => {
              setCurrentPage(numberPage);
            }}
            className={`p-3 bg-black font-bold text-white rounded-m cursor-pointer rounded-md ${
              numberPage === currentPage && "bg-gray-500"
            } `}
            key={numberPage}
          >
            {numberPage}
          </li>
        ))}

        {/* Pagina siguiente */}
        <li
          onClick={handleClickNextPage}
          className="bx bx-caret-right text-2xl p-3 rounded-md bg-black font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Ultima pagina */}
        <li
          onClick={() => setCurrentPage(lastPage)}
          className=" bx bx-last-page text-2xl p-3 rounded-md bg-black font-bold text-white rounded-m cursor-pointer"
        ></li>
      </ul>
    </section>
  );
};

export default Pokedex;
