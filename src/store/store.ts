import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { auth } from "@/src/store/authSlice";

const rootReducer = combineReducers({ auth });
export const store = configureStore({ reducer: rootReducer });
