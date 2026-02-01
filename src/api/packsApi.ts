import { AxiosInstance } from "axios"

export class PacksApi {
  constructor(private instance: AxiosInstance) {}

  postPack = async (data: dataType) => {
    return await this.instance.post("/cards/pack", { cardsPack: data }).then((res) => res.data)
  }

  getPacks = async ({
    page,
    itemsOnPage,
    packName,
    min,
    max,
    user_id,
    signal,
  }: getPacksPropsSignal) => {
    return await this.instance
      .get<getPacksResponse>(`/cards/pack`, {
        params: { page, pageCount: itemsOnPage, packName, min, max, user_id },
        signal: signal,
      })
      .then((res) => res.data)
  }

  deletePack = async (id: string | null) => {
    return await this.instance.delete(`cards/pack/?id=${id}`).then((res) => res.data)
  }
  editPack = async (cardsPack: { id: string | null; name: string }) => {
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
  deckCover?: string | null
  private?: boolean
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
  deckCover: string
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

interface getPacksProps {
  page?: string
  itemsOnPage?: string
  packName: string | null
  min?: number
  max?: number
  user_id?: string
}
interface getPacksPropsSignal extends getPacksProps {
  signal?: AbortSignal
}
