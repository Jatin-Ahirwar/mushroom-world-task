"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asynccreate } from '@/Store/Actions/Actions';
import { useRouter } from 'next/navigation';

const Create = () => {
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false);
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const { user } = useSelector((state)=>state.Admin)
  const { push } = useRouter()

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleTaskChange = (e) => {
    settitle(e.target.value);
  };

  const handleDateChange = (e) => {
    setdescription(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = user._id
    const payload ={
      title , 
      description,
      id
    }
    console.log(payload)
    await dispatch(asynccreate(payload))
    settitle('');
    setdescription('');
    setShowForm(false);
    push("/user/auth/alltasks")
  };

  return (
    <>
      <div className='h-[90vh] w-full flex justify-center items-center'>
        {!showForm ? (
          <div className='flex flex-col gap-2 items-center'>
            <p >Click the button to create a title</p>
            <button onClick={handleToggleForm} className='py-1 px-4  bg-white text-black rounded-[15px]'>Create Task</button>
          </div>
        ) : (
          <form className='flex flex-col gap-4 w-80 border border-[#ffffffc5] p-3 rounded-[10px]' onSubmit={handleSubmit}>
            <input
              required
              type='text'
              value={title}
              onChange={handleTaskChange}
              placeholder='Title'
              className='text-black px-2 py-1 rounded-[3px]'
            />
            <input
              required
              type='text'
              value={description}
              onChange={handleDateChange}
              placeholder='Description'
              className='text-black px-2 py-1 rounded-[3px]'
            />
            <div className='flex gap-2 justify-center'> 
              <button type='submit' className='py-1 px-4  bg-white text-black rounded-[15px]'>Create Task</button>
              <button onClick={handleToggleForm} className='py-1 px-4  border border-white text-white rounded-[15px]'>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Create;
