"use client"
import { asyncsignout } from '@/Store/Actions/Actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Nav = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state)=>state.Admin)
  const { push } = useRouter()
  useEffect(()=>{
    if(isAuthenticated){
      push("/user/auth")
    }
  } ,[isAuthenticated])
  
  const SignoutHandler = ()=>{
    dispatch(asyncsignout())
  }
  return (
    <div className='flex gap-6 px-6 py-4 justify-between items-center  border-b border-[#ffffffc5] '>
      <Link href="/" className='capitalize font-normal text-xl'>Task-Tracker</Link>
        <div className='flex gap-6'>
            {
              !isAuthenticated ?
              <>
              <Link className='' href="/user/signin">Sign-in</Link>
              <Link className='' href="/user/signup">Sign-up</Link>
              </>
              :
              <>
              <Link className='' href="/user/auth/create">Create</Link>
              <Link className='' href="/user/auth/alltasks">All Tasks</Link>
              <Link onClick={SignoutHandler} className='' href="">Logout</Link>
              </>
            }
        </div>
    </div>
  )
}

export default Nav