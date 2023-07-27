import React, { useEffect, useState } from "react";
import Heeader from "../Components/pokedex/Heeader";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const bordersByType = {
  grass: "border-green-500",
  fire: "border-orange-400",
  water: "border-blue-400",
  bug: "border-green-600",
  normal: "border-purple-500"
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

export const Pokemonid = () => {
  const [pokemon, setPokemon] = useState();
  const { id } = useParams();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getPercentStatBar = (stat_base) => {
    const percentBarProgres = Math.floor((stat_base * 100) / 255);
    return `${percentBarProgres}%`;
  };

  return (
    <section>
      <Heeader />

      <section className="px-4 py-16 text-lg font-mono -mb-8 ">
        <article className={`max-w-[800px] mx-auto shadow-lg p-2 ${backgroundCardByType[pokemon?.types[0].type.name]} `}>
          {/* Sección superior */}

          <section className={` relative bg-center ${backgroundByType[pokemon?.types[0].type.name]} h-[130px] border-b-2 border-black`}> 
            <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-16">
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
          </section>

          {/* Informacipon general */}
          <section>
            <div className="flex justify-center mt-2">
              <h3 className="text-xl bg-black text-white rounded-full w-12 text-center p-2">#{pokemon?.id}</h3>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr className="border-black"/>
              <h2 className="capitalize text-3xl font-bold">{pokemon?.name}</h2>
              <hr className="border-black"/>
            </div>

            <div className="flex justify-center gap-6 text-center">
              <div>
                <h5>Weight</h5>
                <span>{pokemon?.weight}</span>
              </div>

              <div>
                <h5>Height</h5>
                <span>{pokemon?.height}</span>
              </div>
            </div>

            <section className="grid md:grid-cols-2 gap-4">
              {/* Tipos */}
              <section className="text-center mt-4">
                <h3>Types</h3>

              <section className="capitalize grid grid-cols-2 gap-4 mt-4">
                {
                  pokemon?.types.map(type => <article className="p-2 px-8 border-[1px] border-black " key={type.type.name}>{type.type.name}</article> )
                }
              </section>

              </section>
              {/* Habilidades */}
              <section className="text-center mt-4">
                <h3>Abilities</h3>

              <section className="capitalize grid grid-cols-2 gap-4 mt-4">
                {
                  pokemon?.abilities.map(ability => <article className="p-2 px-8 border-[1px] border-black " key={ability.ability.name}>{ability.ability.name}</article> )
                }
              </section>

              </section>
            </section>
          </section>

          {/* Sección de estados */}
          <section>
            <h3 className="mt-4 text-xl font-bold -mb-2 text-center">Stats</h3>

            <section>
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.name}>
                  <section className="flex justify-between">
                    <h5 className="capitalize">{stat.stat.name}</h5>
                    <span>{stat.base_stat}/255</span>
                  </section>

                  <div className="bg-gray-100 h-6 rounded-sm">
                    <div
                      style={{ width: getPercentStatBar(stat.base_stat) }}
                      className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-500`}
                    ></div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </article>
      
        <div className="flex justify-center mt-4  -mb-8">
        <Link  to={"/pokedex/"} className="">
        <i>
        <img className="h-20 transform hover:scale-105 transition duration-150" src="https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/7ec065111e818f9.png" alt="" />
        </i>
        </Link> 
        </div>
        
      </section>
    </section>
  );
};
