import { createSlice } from "@reduxjs/toolkit";

const senderSlice = createSlice({
    name: "sender",
    initialState: null,
    reducers: {
        senderProfile: (state, action) => {
            return action.payload;
        },
        removeSenderProfile: () => {
            return null
        }
    }
})

export const { senderProfile, removeSenderProfile } = senderSlice.actions;
export default senderSlice.reducer