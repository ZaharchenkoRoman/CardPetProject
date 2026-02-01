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
  token: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<loginResponse>) => {
      const { token } = action.payload
      localStorage.setItem("token", token)
      return { ...state, ...action.payload }
    },
    logoutUser: () => {
      localStorage.removeItem("token")
      return initialState
    },
  },
})

export const { loginUser, logoutUser } = authSlice.actions
export const auth = authSlice.reducer
