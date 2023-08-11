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
      className={`font-mono min-h-screen bg-black/10`}
    >
      <Heeader />

      <section className="py-6 mx-4 md:mx-24 gap-2 md:grid">
  <h3 className="text-black text-xl">
    <span className="text-red-500 font-extrabold">Welcome {nameTrainer}</span>, here you can find your favorite pokemon{" "}
  </h3>

  <form className="flex flex-col md:flex-row items-start" onSubmit={handleSubmmit}>
    <div className="w-full md:w-1/2">
      <input
        className="px-2 w-full md:w-[70%] py-2 shadow-md shadow-gray-500"
        id="pokemonName"
        type="text"
        placeholder="Search your pokemon"
      />
      <button className="p-2 my-2 md:ml-0 md:my-0 w-full md:w-[20%] text-white shadow-md shadow-gray-500 bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium text-sm px-5 py-2.5 text-center">
      Search
    </button>
    </div>

    

    <select
      className="cursor-pointer py-2 mt-2 md:mt-0 w-full md:w-[30%] shadow-md shadow-gray-500 rounded-sm text-center h-10 capitalize bg-white"
      onChange={(e) => setCurrentType(e.target.value)}
    >
      <option value="">All</option>
      {types.map((type) => (
        <option
          value={type}
          key={type}
          className={`${
            currentType === type ? "bg-red-500 text-white" : ""
          }`}
        >
          {type}
        </option>
      ))}
    </select>
  </form>
</section>



      {/* Paginación */}
      <ul className=" flex gap-1 md:gap-3 justify-center py-4 px-2 text-xl ">
        {/* Primera pagina */}
        <li
          onClick={() => setCurrentPage(1)}
          className=" bx bx-first-page text-2xl p-3 w-10  md:w-12 text-center rounded-lg hover:bg-opacity-50 hover:bg-gray-600 transition duration-200 bg-red-600 font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Pagina anterior */}
        <li
          onClick={handleClickPreviusPage}
          className="bx bx-caret-left text-2xl p-3 w-10  md:w-12 text-center rounded-lg hover:bg-opacity-50 hover:bg-gray-600 transition duration-200 bg-red-600 font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Lista de paginas */}
        {pagesInBlock.map((numberPage) => (
          <li
          onClick={() => {
            setCurrentPage(numberPage);
          }}
          className={`p-3 bg-red-600/0 hover:bg-opacity-50 hover:bg-gray-600 transition duration-200 font-bold text-black cursor-pointer w-10  md:w-12 text-center rounded-lg ${
            numberPage === currentPage && "bg-red-600/100 text-white"
          } `}
          key={numberPage}
        >
          {numberPage}
        </li>
        ))}

        {/* Pagina siguiente */}
        <li
          onClick={handleClickNextPage}
          className="bx bx-caret-right text-2xl p-3 w-10  md:w-12 text-center rounded-lg hover:bg-opacity-50 hover:bg-gray-600 transition duration-200 bg-red-600 font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Ultima pagina */}
        <li
          onClick={() => setCurrentPage(lastPage)}
          className=" bx bx-last-page text-2xl p-3 w-10  md:w-12 text-center rounded-lg hover:bg-opacity-50 hover:bg-gray-600 transition duration-200 bg-red-600 font-bold text-white rounded-m cursor-pointer"
        ></li>
      </ul>

      <section className="px-6 pl-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10 m-16  ">
        {pokemonInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>

      {/* Paginación */}
      <ul className=" flex gap-1 md:gap-3 justify-center py-4 px-2 text-xl ">
        {/* Primera pagina */}
        <li
          onClick={() => setCurrentPage(1)}
          className=" bx bx-first-page text-2xl p-3 w-10  md:w-12 text-center rounded-lg hover:bg-opacity-50 hover:bg-gray-600 transition duration-200 bg-red-600 font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Pagina anterior */}
        <li
          onClick={handleClickPreviusPage}
          className="bx bx-caret-left text-2xl p-3 w-10  md:w-12 -pr-1 md:w-12 text-center rounded-lg hover:bg-opacity-50 hover:bg-gray-600 transition duration-200 bg-red-600 font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Lista de paginas */}
        {pagesInBlock.map((numberPage) => (
          <li
          onClick={() => {
            setCurrentPage(numberPage);
          }}
          className={`p-3 bg-red-600/0 hover:bg-opacity-50 hover:bg-gray-600 transition duration-200 font-bold text-black cursor-pointer w-10  md:w-12 text-center rounded-lg ${
            numberPage === currentPage && "bg-red-600/100 text-white"
          } `}
          key={numberPage}
        >
          {numberPage}
        </li>
        ))}

        {/* Pagina siguiente */}
        <li
          onClick={handleClickNextPage}
          className="bx bx-caret-right text-2xl p-3 w-10  md:w-12 text-center rounded-lg hover:bg-opacity-50 hover:bg-gray-600 transition duration-200 bg-red-600 font-bold text-white rounded-m cursor-pointer"
        ></li>
        {/* Ultima pagina */}
        <li
          onClick={() => setCurrentPage(lastPage)}
          className=" bx bx-last-page text-2xl p-3 w-10  md:w-12 text-center rounded-lg hover:bg-opacity-50 hover:bg-gray-600 transition duration-200 bg-red-600 font-bold text-white rounded-m cursor-pointer"
        ></li>
      </ul>
    </section>
  );
};

export default Pokedex;
