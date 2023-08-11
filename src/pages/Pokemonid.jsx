import React, { useEffect, useState } from "react";
import Heeader from "../Components/pokedex/Heeader";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const bordersByType = {
  grass: "border-green-500",
  fire: "border-orange-400",
  water: "border-blue-400",
  bug: "border-green-600",
  normal: "border-purple-500",
};

const backgroundByType = {
  grass: "bg-[url('/images/Backgrounds/grass.png')]",
  fire: " bg-[url('/images/Backgrounds/fire.avif')]",
  water: "bg-[url('/images/Backgrounds/water.jpg')]",
  bug: "bg-[url('/images/Backgrounds/bug.png')]",
  normal: "bg-[url('/images/Backgrounds/normal.avif')]",
  poison: "bg-[url('/images/Backgrounds/poison.webp')]",
  ground:"bg-[url('/images/Backgrounds/ground.webp')]",
  electric:"bg-[url('/images/Backgrounds/electric.webp')]",
  fairy:"bg-[url('/images/Backgrounds/fairy.webp')]",
  fighting:"bg-[url('/images/Backgrounds/fighting.webp')]",
  rock:"bg-[url('/images/Backgrounds/rock.png')]",
  ghost:"bg-[url('/images/Backgrounds/ghost.webp')]",
  steel:"bg-[url('/images/Backgrounds/steel.jpg')]",
  psychic:"bg-[url('/images/Backgrounds/psychic.jpg')]",
  ice:"bg-[url('/images/Backgrounds/ice.avif')]",
  dragon:"bg-[url('/images/Backgrounds/dragon.webp')]",
  dark:"bg-[url('/images/Backgrounds/dark.avif')]",
};

const backgroundCardByType = {
  grass: "grass-d ",
  fire: " fire-d",
  water: "water-d",
  bug: "bug-d",
  normal:"normal-d",
  poison: "poison-d",
  ground:"ground-d",
  electric:"electric-d",
  fairy:"fairy-d",
  fighting:"fighting-d",
  rock:"rock-d",
  ghost:"ghost-d",
  steel:"steel-d",
  psychic:"psychic-d",
  ice:"ice-d",
  dragon:"dragon-d",
  dark:"dark-d",
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
  }, [id]);

  const getPercentStatBar = (stat_base) => {
    const percentBarProgres = Math.floor((stat_base * 100) / 255);
    return `${percentBarProgres}%`;
  };

  

  return (
    <section className="font- bg-black/10">
      <Heeader />
      <div className="grid grid-flow-col h-10 mt-5 mx-5">
      <div className=" flex justify-start">
      <Link to={`/pokedex/${pokemon?.id - 1}`} className="">
        
            <button className="font-bold rounded-md text-lg p-2 my-2 text-white shadow-md shadow-gray-500 bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-black px-5 py-2.5 text-center mr-2 mb-2">Previous</button>
          
        </Link>
      </div>
      <div className="flex justify-end">
        <Link to={`/pokedex/${pokemon?.id + 1}`}>
        
            <button className="font-bold rounded-md text-lg p-2 my-2 text-white shadow-md shadow-gray-500 bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-black px-9 py-2.5 text-center mr-2 mb-2 ">Next</button>
          
        </Link>
      </div>
      </div>     
      
  
      <section className="px-4 py-16 text-lg font-mono -mb-8">
        <article
          className={`max-w-[800px] mx-auto shadow-lg p-1 transition duration-200 ${
            backgroundCardByType[pokemon?.types[0].type.name]
          } `}
        >
          {/* Sección superior */}
<div className="bg-black/10 h-full">
          <section
            className={` relative ${
              backgroundByType[pokemon?.types[0].type.name]
            } bg-cover h-[130px] border-b-2 border-black`}
            style={{ backgroundPosition: "bottom" }} 
          >
            <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-16">
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
          </section>

          {/* Informacipon general */}
          <section className="text-white m-2" >
            <div className="flex justify-center mt-2">
              <h3 className="text-xl bg-black text-white rounded-full h-11 w-auto text-center p-2">
                #{pokemon?.id}
              </h3>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr className="border-black" />
              <h2 className=" capitalize text-3xl font-bold">{pokemon?.name}</h2>
              <hr className="border-black" />
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
                  {pokemon?.types.map((type) => (
                    <article
                      className="p-2 px-8 border-2 shadow-sm shadow-black bg-black/60 border-gray-700 "
                      key={type.type.name}
                    >
                      {type.type.name}
                    </article>
                  ))}
                </section>
              </section>
              {/* Habilidades */}
              <section className="text-center mt-4 ">
                <h3>Abilities</h3>

                <section className="capitalize grid grid-cols-2 gap-4 mt-4">
                  {pokemon?.abilities.map((ability) => (
                    <article
                      className="p-2 px-8 shadow-sm shadow-black  border-2 bg-black/60 border-gray-700 "
                      key={ability.ability.name}
                    >
                      {ability.ability.name}
                    </article>
                  ))}
                </section>
              </section>
            </section>
          </section>

          {/* Sección de estados */}
          <section className="text-white m-2">
            <h3 className="mt-4 text-xl font-bold -mb-2 text-center">Stats</h3>

            <section className="pb-2 -mb-2">
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
          </div>
        </article>

        <div className="flex justify-center mt-4  -mb-8">
          <Link to={"/pokedex/"} className="">
            <i>
              <button className="font-bold rounded-md text-lg p-2 my-2 text-white shadow-md shadow-gray-500 bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 px-5 py-2.5 text-center mr-2 mb-2 ">
                Back To PokeDex
              </button>
            </i>
          </Link>
        </div>       
      </section>
    </section>
  );
};
