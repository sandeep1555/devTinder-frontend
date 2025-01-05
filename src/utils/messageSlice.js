import { createSlice } from "@reduxjs/toolkit";


const messageSlice=createSlice({
    name: "message",
    initialState: null,
    reducers:{
        addMessage:(state,action)=>
        {
            return action.payload
        },
        removeMessage:()=>
        {
            return null
        }
    }
})

export const  {addMessage,removeMessage}=messageSlice.actions;
export default messageSlice.reducer