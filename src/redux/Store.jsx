import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import authReducer from "./AuthSlice";
import likeReducer from "./LikeSlice";

const store = configureStore({
  reducer: {
    cartdata: cartReducer,
    auth: authReducer,
    like: likeReducer,
  },
});

export default store;