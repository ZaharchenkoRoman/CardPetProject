import { AxiosInstance } from "axios"

export class PacksApi {
  constructor(private instance: AxiosInstance) {}

  postPack = async (data: dataType) => {
    return await this.instance.post("/cards/pack", { cardsPack: data }).then((res) => res.data)
  }
  getPacks = async (page: string, pageCount: string) => {
    return await this.instance
      .get<getPacksResponse>(`/cards/pack?page=${page}&pageCount=${pageCount}`)
      .then((res) => res.data)
  }
  deletePack = async (id: string) => {
    return await this.instance.delete(`cards/pack/?id=${id}`).then((res) => res.data)
  }
  editPack = async (cardsPack: { id: string; name: string }) => {
    return await this.instance
      .put(`cards/pack`, {
        cardsPack: { _id: cardsPack.id, name: cardsPack.name },
      })
      .then((res) => res.data)
  }
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
