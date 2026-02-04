import { AxiosInstance } from "axios"

export class CardsApi {
  constructor(private instance: AxiosInstance) {}

  getCards = async ({ packId, cardQuestion, pageCount, page }: cardsParamType) => {
    return await this.instance
      .get<getCardsResponse>(`/cards/card?cardsPack_id=${packId}`, {
        params: { packId, pageCount, page, cardQuestion },
      })
      .then((res) => res.data)
  }

  createCards = async (data: createCardDTO) => {
    return await this.instance
      .post(`/cards/card`, {
        card: {
          cardsPack_id: data.packId,
          question: data.question,
          answer: data.answer,
        },
      })
      .then((res) => res.data)
  }

  deleteCard = async (cardId: string | null) => {
    return await this.instance.delete(`/cards/card?id=${cardId}`)
  }

  putCard = async (data: {
    cardId: string
    question?: string
    answer?: string
    grade?: number | null
  }) => {
    return await this.instance
      .put(`/cards/card`, {
        card: {
          _id: data.cardId,
          question: data.question,
          answer: data.answer,
          grade: data.grade?.toString(),
        },
      })
      .then((res) => res.data)
  }
}

/*Types*/

interface cardsParamType {
  packId?: string | null
  cardQuestion?: string | null
  page?: number | null
  pageCount?: number | null
}

interface createCardDTO {
  packId: string
  question: string | null
  answer: string | null
}

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
