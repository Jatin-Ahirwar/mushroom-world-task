"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const layout = ({children}) => {
    const { push } = useRouter()
    const { isAuthenticated } = useSelector((state)=>state.Admin)
    useEffect(()=>{
        if(!isAuthenticated){
            push("/")
        }
    },[isAuthenticated])
  return children
}

export default layout