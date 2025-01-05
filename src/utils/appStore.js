import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionsSlice from "./connectionsSlice";
import requestsSlice from "./requestsSlice";
import messageSlice from "./messageSlice";
import senderSlice from "./senderSlice";

const appStore = configureStore({
    reducer: {
        user: userSlice,
        feed: feedSlice,
        connections: connectionsSlice,
        requests: requestsSlice,
        message:messageSlice,
        sender:senderSlice

    }
})

export default appStore