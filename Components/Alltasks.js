"use client"
import React, { useEffect, useState } from 'react'
import { IoIosMore } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { asyncdelete, asyncupdate } from '@/Store/Actions/Actions';
import Link from 'next/link';

const Alltasks = () => {
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false);
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [taskID, settaskID] = useState("")
  const [visible, setvisible] = useState(false)
  const { user } = useSelector((state)=>state.Admin)
  const UserID = user?._id
  const tasks = user?.tasks

  const DeleteHandler = async(TaskID)=> {
    const payload ={
      TaskID, 
      UserID
    }
    await dispatch(asyncdelete(payload))
    console.log(payload)
    setvisible(false)
  }

  const handleToggleForm = (taskid) => {
    setShowForm(!showForm);
    settaskID(taskid)
  };

  const handleTaskChange = (e) => {
    settitle(e.target.value);
  };

  const handleDateChange = (e) => {
    setdescription(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const payload ={
      title , 
      description,
      taskID
    }
    console.log(payload)
    await dispatch(asyncupdate(payload))
    settitle('');
    setdescription('');
    setShowForm(false);
  };

  const [visibleCardId, setVisibleCardId] = useState(null);

  const showCardMenu = (id) => {
    setVisibleCardId(id);
  };

  const hideCardMenu = () => {
    setVisibleCardId(null);
  };

  return (
    <div className='relative h-[90vh] w-full flex justify-center px-8'>
      <div className='h-full w-full flex flex-col items-center  pt-8 gap-8 '>
        <h1 className='text-[1rem] font-medium'>All Tasks</h1>  
        
        <div className='w-full flex grid-cols-4 gap-12'>
            {
              tasks?.map((item , index )=>(
                <div key={index} className='w-72 rounded-[10px] border border-[#ffffffa4] px-2 pt-1 pb-2 flex flex-col gap-4'>
                  <div className='flex justify-between '>
                    <h2>{item.title}</h2>
                    <div className='relative '>
                      {
                        visibleCardId === item._id ? 
                        <div className='absolute flex items-center right-0 top-1 bg-black gap-2'>
                          <MdEdit onClick={() => handleToggleForm(item._id)} fontSize={16} color='white' />
                          <RiDeleteBinLine onClick={() => DeleteHandler(item._id)} fontSize={16} color='white' />
                          <IoClose onClick={hideCardMenu} fontSize={18} color='white' />
                        </div>
                        :
                        <div className='cursor-pointer' onClick={() => showCardMenu(item._id)}>
                          <IoIosMore color='white' fontSize={24} />
                        </div>
                      }

                    </div>
                  </div>
                  <p className='capitalize'>{item.description}</p>          
                </div>
              ))
            } 
            <div className='flex items-center'>
              <Link href={"/user/auth/create"} className='flex items-center justify-center h-8 px-4  bg-white text-black rounded-[15px]'>Create Task</Link>
            </div>
        </div>
      </div>  

      {showForm ? (
        <div className='absolute h-full w-full backdrop-blur-[2px] flex justify-center items-center'>
            <form className='flex flex-col gap-4 w-80 border border-[#ffffffc5] p-3 rounded-[10px]' onSubmit={handleSubmit}>
              <input
                // required
                type='text'
                value={title}
                onChange={handleTaskChange}
                placeholder='Title'
                className='text-black px-2 py-1 rounded-[3px]'
              />
              <input
                // required
                type='text'
                value={description}
                onChange={handleDateChange}
                placeholder='Description'
                className='text-black px-2 py-1 rounded-[3px]'
              />
              <div className='flex gap-2 justify-center'> 
                <button type='submit' className='py-1 px-4  bg-white text-black rounded-[15px]'>Update Task</button>
                <button onClick={handleToggleForm} className='py-1 px-4  border border-white text-white rounded-[15px]'>Cancel</button>
              </div>
            </form>
            </div>
          ) : (
            null
      )}

    </div>
  )
}

export default Alltasks