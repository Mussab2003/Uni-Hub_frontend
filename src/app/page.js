'use client'

import React from 'react'
import { IoDocumentText } from "react-icons/io5";
const Home = () => {
  return (
    <div className='mx-2'>
      <div className='dark:bg-gradient-to-tr from-dodgerBlue to-darkBlack bg-[#d0f4d4] px-20 flex justify-evenly items-center w-full h-96 rounded-b-2xl'>
        <div className='flex flex-col'>
            <h1 className='font-bold text-5xl dark:text-dark-text'>View and upload <br/>repositories, create<br/>quizzes and notes!</h1>
        </div>
        <div>
          <IoDocumentText size={250}/>
        </div>

      </div> 
    </div>
  )
}

export default Home