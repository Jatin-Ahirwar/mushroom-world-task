const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    user : null , 
    isAuthenticated: false , 
    errors : []
}

export const Reducer  = createSlice({
    name : "user",
    initialState,
    reducers:{
    
    adduser:(state,action)=>{
    state.user = action.payload,
    state.isAuthenticated = true
    },
    removeuser:(state,action)=>{
    state.user = null,
    state.isAuthenticated = false , 
    state.errors = []
    },
    iserror:(state,action)=>{
    state.errors.push(action.payload)
    },
    }
}) 

export const {
    adduser, 
    removeuser, 
    iserror
} = Reducer.actions

export default Reducer.reducer