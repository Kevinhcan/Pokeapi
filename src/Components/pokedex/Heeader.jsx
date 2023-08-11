import React from "react";
import { useDispatch } from "react-redux";
import { setNameTrainer } from "../../store/slices/nameTrainer.slice";



const Heeader = () => {

  const dispatch = useDispatch()

  const handleClickLogout = () => {
    dispatch(setNameTrainer(""))
  }

  return (
    <section className="relative ">
      <div className="h-16 bg-red-600 grid items-center">
        <div className=" max-w-[400px] sm:max-w-[300px] ml-2">
          <img src="/images/pokedex-logo.png" alt="" />
        </div>
      </div>

      <div className="h-12 bg-black justify-start flex">
      <i onClick={ handleClickLogout } className='bx bx-log-out gap-1 flex rounded-md pt-1.5 px-1  w-auto text-white z-30 text-3xl hover:text-red-600 transition duration-300 cursor-pointer'><span className="text-lg font-mono mt-1">Logout</span></i>
      </div>
      <div className='h-20 aspect-square rounded-full bg-white border-[8px] border-black absolute -bottom-4 right-0 -translate-x-1/2 after:content-[""] after:h-12 after:aspect-square after:rounded-full after:bg-gray-700 after:absolute after:border-[7px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2'>
      
      </div>
    </section>
  );
};

export default Heeader;

