import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnections: (state, actions) => {
            return actions.payload;
        },
        removeConnections: () => {
            return null
        }
    }

})

export const { addConnections, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer