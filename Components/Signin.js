"use client"
import { asyncsignin } from '@/Store/Actions/Actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Signin = () => {
  const { push } = useRouter()
  const dispatch = useDispatch()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const { isAuthenticated } = useSelector((state)=>state.Admin)

  const SubmitHandler = async(e)=>{
    e.preventDefault()
    const payload = {
      email, 
      password
    }
    await dispatch(asyncsignin(payload))
    setemail("")
    setpassword("")
  }
  useEffect(() => {
    if(isAuthenticated){
        push("/user/auth")
    }
  },[isAuthenticated])  


  return (
    <div className='h-[90vh]  flex justify-center items-center'>
      <div className="h-[50vh] px-4 border border-[#ffffffc5] rounded-[15px] flex flex-col items-center justify-between py-6">

        <h1 >Sign-In to Task-Tracker</h1>  

        <div className='flex flex-col gap-3 w-80'>
          <label>Email Address</label>
          <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" className='py-1 px-2 text-black rounded-sm  ' placeholder='Email address'  />
        </div>

        <div className='flex flex-col gap-3 w-80'>
          <label>Password</label>
          <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" className='py-1 px-2 text-black rounded-sm  ' placeholder='Password'  />
        </div>

        <button onClick={SubmitHandler} type='submit'  className='bg-white text-black py-1 px-5 text-xm rounded-[15px] flex items-center justify-center font-normal ' >Sign-In</button>

        <label className='border-t pt-2 px-8 border-[#ffffffc5]'>Don't have an account ? <Link className='text-blue-500 ' href="/user/signup">Sign-up</Link> </label>

      </div>
    </div>
  )
}

export default Signin