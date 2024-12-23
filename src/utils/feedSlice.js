import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state, action) => {
            const newArray = state.filter(r => r._id !== action.payload);
            return newArray
        },
        resetFeed: () => { return null }
    }
})
export const { addFeed, removeFeed, resetFeed } = feedSlice.actions;
export default feedSlice.reducer