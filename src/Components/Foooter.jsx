import React from 'react'

const footer = () => {
  return (
    <section className='w-full fixed bottom-0 left-0"'> 
      <div className='h-12 bg-red-600' ></div>
      <div className='h-10 bg-black' ></div>
      <div className='h-20 aspect-square rounded-full bg-white border-[7px] border-black absolute bottom-0 left-1/2 -translate-x-1/2 after:content-[""] after:h-12 after:aspect-square after:rounded-full after:bg-gray-700 after:absolute after:border-[7px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2'></div>
    </section>
  )
}

export default footer