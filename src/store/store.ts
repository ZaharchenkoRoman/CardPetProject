import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { auth } from "@/src/store/authSlice"
import { cards } from "@/src/store/cardSlice"

const rootReducer = combineReducers({ auth, cards })
export const store = configureStore({ reducer: rootReducer })
