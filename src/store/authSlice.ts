import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialStateType } from "@/src/store/types/types"
import { loginResponse } from "@/src/api/authApi"

const initialState: initialStateType = {
  _id: "",
  email: "",
  name: "",
  publicCardsPacksCount: 0,
  created: "",
  updated: "",
  isAdmin: false,
  verified: false,
  rememberMe: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<loginResponse>) => {
      return { ...state, ...action.payload }
    },
    logoutUser: () => {
      return initialState
    },
  },
})

export const { loginUser, logoutUser } = authSlice.actions
export const auth = authSlice.reducer
