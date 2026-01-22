import { instance } from "@/src/api/api"

export const cardsApi = {
  getCards: async (packId?: string | null) => {
    return await instance.get<getCardsResponse>(`/cards/card?cardsPack_id=${packId}`)
  },
  createCards: async (data: { packId: string; question: string | null; answer: string | null }) => {
    return await instance.post(`/cards/card`, {
      card: {
        cardsPack_id: data.packId,
        question: data.question,
        answer: data.answer,
      },
    })
  },
  deleteCard: async (packId: string) => {
    return await instance.delete(`/cards/card?id=${packId}`)
  },
  putCard: async (cardId: string, question?: string) => {
    return await instance.put(`/cards/card`, {
      card: {
        _id: cardId,
        question,
      },
    })
  },
}

/*Types*/

export interface getCardsResponse {
  cards: cardsType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  packCreated: string
  packDeckCover: null
  packName: string
  packPrivate: boolean
  packUpdated: string
  packUserId: string
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}

export interface cardsType {
  answer: string
  cardsPack_id: string
  comments: string
  created: string
  grade: number
  more_id: string
  question: string
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  __v: number
  _id: string
}
