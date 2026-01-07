import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/userAuth";
import feedReducer from "./slices/feed.slice";
import connectionReducer from "./slices/connections.slice";
import requestReducer from "./slices/request.slice";
const store = configureStore({
  reducer: {
    authReducer: userAuthReducer,
    feedReducer: feedReducer,
    connectionReducer: connectionReducer,
    requestReducer: requestReducer,
  },
});

export default store;
