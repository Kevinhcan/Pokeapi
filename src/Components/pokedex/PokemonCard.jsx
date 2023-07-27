import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bordersByType = {
  grass: "border-green-900",
  fire: "border-red-900",
  water: "border-blue-400",
  bug: "border-green-600",
  normal: "border-purple-500",
};

const backgroundByType = {
  grass: "bg-[url('https://pm1.narvii.com/7457/6a7795293c255f4ccc49608b3d2e1f5e3310c062r4-565-283_00.jpg')]",
  fire: " bg-[url('https://img.freepik.com/fotos-premium/erupcion-volcanica-masiva-gran-volcan-que-arroja-lava-caliente-gases-atmosfera-3d-illustra_715271-989.jpg?w=826')]",
  water: "bg-blue-400 bg-gradient-to-b from-blue-400 to-blue-600",
  bug: "bg-green-800 bg-gradient-to-b from-green-800 to-green-500",
  normal: "bg-purple-600 bg-gradient-to-b from-purple-500 to-purple-300"
};

const backgroundCardByType = {
  grass:
    "bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-yellow-200 via-green-200 to-green-500 ",
  fire: "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-600 to-red-600",
  water: "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-green-300 via-blue-500 to-purple-600",
  bug: "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-500 to-green-500",
  normal: "bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400",
};

const colorTextBytype = {
  grass: "text-green-700",
  fire: "text-red-800",
  water: "text-blue-800",
  bug: "text-brown-800",
  normal: "text-black",
}

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
      className={` shadow-xl shadow-black transform hover:scale-105 transition duration-150 text-center border-4 rounded-md capitalize max-w-sm border-gray-800 ${backgroundCardByType[pokemon?.types[0].type.name]}`}
    >
      {/*Sección superior*/}
      <section
        className={`bg-gradient-to-b h-[180px] relative m-3 border-2  ${
          bordersByType[pokemon?.types[0].type.name]
        } ${
          backgroundByType[pokemon?.types[0].type.name]
        } 
        bg-cover`}
      >
        
        <div className="absolute -bottom-6 w-[200px] left-1/2 -translate-x-1/2 ">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
      </section>
      {/*Sección inferior*/}
      <section>
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
