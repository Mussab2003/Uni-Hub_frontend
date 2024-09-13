'use client'

import React from 'react'
import { IoDocumentText } from "react-icons/io5";
const Home = () => {
  return (
    <div className='mx-2'>
      <div className='p-2 dark:bg-gradient-to-tr from-dodgerBlue to-darkBlack bg-[#d0f4d4] px-20 flex  flex-row  sm:justify-center md:justify-evenly lg:justify-evenly items-center w-full min-h-80 md:h-96 lg:h-96 rounded-b-2xl'>
        <div className='flex flex-col'>
            <h1 className='font-bold text-4xl md:text-5xl lg:text-5xl dark:text-dark-text'>View and upload <br/>repositories, create<br/>quizzes and notes!</h1>
        </div>
        <div className='mt-2'>
          <IoDocumentText size={250} className='hidden lg:flex md:flex'/>
        </div>

      </div> 
    </div>
  )
}

export default Home