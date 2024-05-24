import Link from 'next/link'
import React from 'react'

const Authpage = () => {
  return (
    <div className='flex justify-center items-center  h-[90vh] '>
        <div className=' flex flex-col gap-4 justify-center'>
            <h1 className='text-4xl'>Welcome to Task-Tracker</h1>
            <h4>Set tasks to recur daily, weekly, monthly, or at custom intervals.</h4>
            <p className='w-[50vw] '>Task-Tracker is a user-friendly to-do list application designed to help individuals and teams manage their tasks efficiently. It offers a simple yet powerful interface to organize, prioritize, and track tasks, enhancing productivity and ensuring nothing falls through the cracks.Task-Tracker is the ultimate solution for anyone looking to streamline their task management process, whether for personal use or team collaboration. With its robust set of features, it adapts to various needs and helps users stay organized and productive.</p>
            <div className='flex gap-4'>
                <Link className='primarybtn px-4 py-2 rounded-[7px] bg-white text-black' href="/user/auth/create">Create Task</Link>
                <Link className='secondarybtn px-4 py-2 rounded-[8px]  border-2 border-white ' href="/user/auth/alltasks">All Tasks</Link>
            </div>
        </div>

    </div>
  )
}

export default Authpage