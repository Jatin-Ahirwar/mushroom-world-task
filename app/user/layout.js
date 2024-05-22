"use client"
import Nav from '@/Components/Nav'
import { asyncCurrentUser } from '@/Store/Actions/Actions'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const StudentLayout = ({children}) => {
  const dispatch = useDispatch()
  const { push } = useRouter()
  const { isAuthenticated } = ((state)=>state.Admin)
  useEffect(()=>{
    dispatch(asyncCurrentUser())
    if(isAuthenticated){
      push("/user/auth")
    }
  }, [isAuthenticated])
  return (
    <>
      <Nav/>
      {children}
    </>
)
}

export default StudentLayout