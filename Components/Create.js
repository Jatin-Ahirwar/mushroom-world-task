"use client"
import React, { useState } from 'react';
import Button from './utils/Button';

const Create = () => {
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task:', task);
    console.log('Description:', date);
    setTask('');
    setDate('');
    setShowForm(false);
  };

  return (
    <>
      <div className='h-[90vh] w-full flex justify-center items-center'>
        {!showForm ? (
          <div className='flex flex-col gap-2 items-center'>
            <p >Click the button to create a task</p>
            <button onClick={handleToggleForm} className='py-1 px-4  bg-white text-black rounded-[15px]'>Create Task</button>
          </div>
        ) : (
          <form className='flex flex-col gap-4 w-80 border border-[#ffffffc5] p-3 rounded-[10px]' onSubmit={handleSubmit}>
            <input
              type='text'
              value={task}
              onChange={handleTaskChange}
              placeholder='Title'
              className='text-black px-2 py-1 rounded-[3px]'
            />
            <input
              type='text'
              value={date}
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
