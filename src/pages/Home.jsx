import React from "react";
import Footer from "../Components/Foooter";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmmit = (e) => {
    e.preventDefault();
    dispatch(setNameTrainer(e.target.nameTrainer.value));
    navigate("/pokedex");
  };

  return (
    <section className={`font-mono bg-fixed bg-center bg-no-repeat bg-cover min-h-screen grid grid-rows-[1fr_auto]   bg-[url("https://external-preview.redd.it/NXrR_qnMRHrwUoE8pbeiX26fq4mNctFsmdEghRVApSQ.jpg?auto=webp&s=b18e1b0df84f417036d4e1ac0affb6245a071ebf")]`}>
      <section  className="min-h-screen flex items-center justify-center">
        <article className="text-center bg-black/70 p-5 rounded-lg text-white font-bold">
          <div>
            <img src="/images/pokedex-logo.png" alt="Pokedex Image" />
          </div>
          <h2>Hello trainer!</h2>
          <p>Give me your name to start!: </p>
          <form onSubmit={handleSubmmit} className=" text-black flex justify-center mt-4">
            <input className="px-4 py-2 border border-gray-400 focus:outline-none focus:border-red-500" id="nameTrainer" type="text" placeholder="Your name ..." />
            <button className="p-0 my-0 md:ml-0 w-full md:w-[20%] text-white bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium text-sm px-5 py-2.5 text-center">Start!</button>
          </form>
        </article>
      </section>

      <Footer />
    </section>
  );
};

export default Home;
