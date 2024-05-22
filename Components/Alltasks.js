"use client"
import React, { useState } from 'react'
import { IoIosMore } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const Alltasks = () => {
  const [visible, setvisible] = useState(false)
  const ShowHandler = ()=> {
    setvisible(true)
  }
  const HideHandler = ()=> {
    setvisible(false)
  }
  return (
    <div className='h-[90vh] w-full flex justify-between px-8'>
      <div className='h-full w-[30vw] flex flex-col items-center  pt-8 gap-8 '>
        <h1 className='text-[1rem] font-medium'>To Start</h1>  

        <div className='w-72 rounded-[10px] border border-[#ffffffa4] px-2 pt-1 pb-2 flex flex-col gap-4'>
          <div className='flex justify-between '>
            <h2>To-Do-list</h2>
            <div className='relative '>
              {
                !visible ? 
                <div  className='cursor-pointer '>
                  <IoIosMore onClick={ShowHandler} color='white'  fontSize={24} />
                </div>
                :
                <div className='absolute flex items-center right-0 top-1 bg-black gap-2'>
                  <MdEdit onClick={HideHandler} fontSize={16} color='white' />
                  <RiDeleteBinLine onClick={HideHandler} fontSize={16} color='white' />
                  <IoClose onClick={HideHandler} fontSize={18} color='white' />
                </div>  
              }

            </div>
          </div>
          <p className='capitalize'>HTML Stands hypertext markup language </p>          
        </div>

      </div>

      <div className='h-full w-[30vw] flex flex-col items-center pt-8'>
        <h1 className='text-[1rem] font-medium'>In Progress</h1>  

      </div>
      
      <div className='h-full w-[30vw] flex flex-col items-center pt-8'>
        <h1 className='text-[1rem] font-medium'>Completed</h1>  

      </div>
    </div>
  )
}

export default Alltasks