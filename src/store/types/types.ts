export interface initialStateType {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardsPacksCount: number
  created: string
  updated: string
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
  token: string
}
export interface CardState {
  question?: string
  answer?: string
  packName?: string
  deckCover?: string
}
