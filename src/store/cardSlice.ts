import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CardState } from "@/src/store/types/types"

const initialState: CardState = {
  question: "",
  answer: "",
  packName: "",
  deckCover: "",
}

const cardSlice = createSlice({
  name: "cardSlice",
  initialState,
  reducers: {
    setCardData: (state, action: PayloadAction<CardState>) => {
      return (state = action.payload)
    },
    setDeckCover: (state, action) => {
      return { ...state, deckCover: action.payload }
    },
  },
})
export const { setCardData, setDeckCover } = cardSlice.actions
export const cards = cardSlice.reducer
