import axios from "axios"
import { adduser , removeuser , iserror } from "../Reducers/Reducer.js"
import { toast } from "react-toastify";


export const asyncCurrentUser = () => async(dispatch,getstate) =>{
    try {
        const { data } = await axios.post("/api/users/user" )
        dispatch(adduser(data.user))      
    } catch (error) {
        dispatch(iserror(error.message))
    }
}

export const asyncsignup = (payload) => async(dispatch,getstate) =>{
    try {
        const { data } = await axios.post("/api/users/signup", payload )
        dispatch(asyncCurrentUser())
        toast.success("Successfully Signed Up.")      
    } catch (error) {
        dispatch(iserror(error.response.data.message))
        toast.error(error.response.data.error)      
    }
}


export const asyncsignin = (payload) => async(dispatch,getstate) =>{
    try {
        const { data } = await axios.post("/api/users/signin", payload )
        dispatch(asyncCurrentUser())
        toast.success("Successfully Sign In.")      
    } catch (error) {
        dispatch(iserror(error.response.data.error))
        toast.error(error.response.data.error)      
    }
}


export const asyncsignout = (payload) => async(dispatch,getstate) =>{
    try {
        const { data } = await axios.get("/api/users/logout" , payload)
        dispatch(removeuser())
        toast.success(data.message)      
    } catch (error) {
        dispatch(iserror(error.response.data.error))
        toast.error(error.response.data.error)
    }
}



export const asynccreate = (payload) => async(dispatch,getstate) =>{
    try {
        const { data } = await axios.post("/api/users/create", payload )
        dispatch(asyncCurrentUser())
        toast.success("Task Created.")      
    } catch (error) {
        dispatch(iserror(error.response.data.error))
        toast.error(error.response.data.error)      
    }
}

export const asyncupdate = (payload) => async(dispatch,getstate) =>{
    try {
        const { data } = await axios.post("/api/users/update", payload )
        dispatch(asyncCurrentUser())
        toast.success("Task Updated.")      
    } catch (error) {
        dispatch(iserror(error.response.data.error))
        toast.error(error.response.data.error)      
    }
}

export const asyncdelete = (payload) => async(dispatch,getstate) =>{
    try {
        const { data } = await axios.post("/api/users/delete", payload )
        dispatch(asyncCurrentUser())
        toast.success("Task Deleted.")      
    } catch (error) {
        dispatch(iserror(error.response.data.error))
        toast.error(error.response.data.error)      
    }
}
