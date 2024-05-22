import axios from "axios"
import { adduser , removeuser , iserror } from "../Reducers/Reducer.js"
import { toast } from "react-toastify";


export const asyncCurrentUser = () => async(dispatch,getstate) =>{
    try {
        const { data } = await axios.post("/api/users/user" )
        dispatch(adduser(data.user))      
        // console.log(data.user)
    } catch (error) {
        // console.log(error.message)
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
        console.log(data.message)
        toast.success(data.message)      
    } catch (error) {
        dispatch(iserror(error.response.data.error))
        toast.error(error.response.data.error)
    }
}

