import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import authReducer from './AuthSlice';
import likeReducer from "./LikeSlice"; 
export const store = configureStore({
  reducer: {
    cartdata: cartReducer,
    auth: authReducer,
    like: likeReducer
  },
});