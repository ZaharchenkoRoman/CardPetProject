import { instance } from "@/src/api/api"

export const packsApi = {
  postPack: async (data: dataType) => {
    return await instance.post("/cards/pack", { cardsPack: data })
  },

  getPacks: async (page: string, pageCount: string) => {
    return await instance.get<getPacksResponse>(`/cards/pack?page=${page}&pageCount=${pageCount}`)
  },
  deletePack: async (id: string) => {
    return await instance.delete(`cards/pack/?id=${id}`)
  },
  editPack: async (cardsPack: { id: string; name: string }) => {
    return await instance.put(`cards/pack`, {
      cardsPack: { _id: cardsPack.id, name: cardsPack.name },
    })
  },
}

/*Types*/

export interface dataType {
  name?: string
  path?: string
  grade?: string
  shots?: string
  rating?: string
  deckCover?: string
  private: boolean
  type?: string
}
export interface packType {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

interface getPacksResponse {
  cardPacks: packType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
