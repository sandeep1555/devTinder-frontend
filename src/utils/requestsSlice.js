import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests: (state, actions) => {
            return actions.payload;
        },
        removeRequests: (state, action) => {
            const newArray = state.filter(r => r._id !== action.payload)
            return newArray
        },
        resetRequest: () => { return null }
    }

})

export const { addRequests, removeRequests, resetRequest } = requestsSlice.actions;
export default requestsSlice.reducer