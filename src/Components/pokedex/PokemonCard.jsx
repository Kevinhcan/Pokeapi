import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bordersByType = {
  grass: "border-[#B1DBBC]",
  fire: "border-[#E75C35]",
  water: "border-blue-400",
  bug: "border-[#62db60]",
  normal: "border-purple-500",
  poison: "border-[#a564e3]",
  ground:"border-[#895c1a]",
  electric:"border-[#ffba00]",
  fairy:"border-[#f285bf]",
  fighting:"border-[#96402A]",
  rock:"border-[#8d8d94]",
  ghost:"border-[#454aa8]",
  steel:"border-[#728881]",
  psychic:"border-[#d13e3e]",
  ice:"border-[#64cbf5]",
  dragon:"border-[#56a4ae]",
  dark:"border-[#0d1211]",
};

const backgroundByType = {
  grass: "grass ",
  fire: " fire",
  water: "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-green-300 via-blue-500 to-purple-600",
  bug: "bug",
  normal:"bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400",
  poison: "poison",
  ground:"ground",
  electric:"electric",
  fairy:"bg-gradient-to-r from-orange-300 to-rose-300",
  fighting:"fighting",
  rock:"rock",
  ghost:"ghost",
  steel:"steel",
  psychic:"psychic",
  ice:"ice",
  dragon:"dragon",
  dark:"dark",
};

/* const backgroundCardByType = {
  grass:
    "bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-yellow-200 via-green-200 to-green-500 ",
  fire: "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-600 to-red-600",
  water: "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-green-300 via-blue-500 to-purple-600",
  bug: "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-500 to-green-500",
  normal: "bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400",
}; */

const colorTextBytype = {
  grass: "text-green-700",
  fire: "text-[#E75C35]",
  water: "text-blue-400",
  bug: "text-[#62db60]",
  normal: "text-purple-500",
  poison: "text-[#a564e3]",
  ground:"text-[#895c1a]",
  electric:"text-[#ffba00]",
  fairy:"text-[#f285bf]",
  fighting:"text-[#96402A]",
  rock:"text-[#8d8d94]",
  ghost:"text-[#454aa8]",
  steel:"text-[#728881]",
  psychic:"text-[#d13e3e]",
  ice:"text-[#64cbf5]",
  dragon:"text-[#56a4ae]",
  dark:"text-[#0d1211]",
};

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState();

  const types = pokemon?.types
    .slice(0, 2)
    .map((type) => type.type.name)
    .join(" / ");

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={`font-mono shadow-xl shadow-black hover:rotate-2 hover:-hue-rotate-15 transform hover:scale-105 transition duration-200 text-center border-8 rounded-xl capitalize max-w-sm min-w-[250px] ${bordersByType[[pokemon?.types[0].type.name]]}`} /* {backgroundCardByType[pokemon?.types[0].type.name]} */
    >
      {/*Sección superior*/}
      <section
        className={`bg-gradient-to-b h-[180px] ${
          bordersByType[pokemon?.types[0].type.name]
        } ${
          backgroundByType[pokemon?.types[0].type.name]
        } bg-cover relative `}
      >
        <div className="absolute -bottom-6 w-[200px] left-1/2 -translate-x-1/2 ">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
      </section>
      {/*Sección inferior*/}
      <section className="bg-white -mt-6 py-6">
        <h3 className={ `mt-6 mb-2 text-3xl ${colorTextBytype[pokemon?.types[0].type.name]} `}>{pokemon?.name} </h3>
        <h4 className="text-xl">{types}</h4>
        <span>Type</span>

        

        <section className="grid grid-cols-3 gap-2 p-2 border-0 ">
          {pokemon?.stats.map((stat) => (
            <div key={stat.stat.name}>
              <h5>{stat.stat.name}</h5>
              <span className={` text-2xl ${colorTextBytype[pokemon?.types[0].type.name]}`}>{stat.base_stat}</span>
            </div>
          ))}
        </section>
      </section>
    </Link>
  );
};

export default PokemonCard;
