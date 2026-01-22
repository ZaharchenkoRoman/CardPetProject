import { ChangeEvent, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { packsApi, packType } from "@/src/api/packsApi"
import { SelectChangeEvent } from "@mui/material"

interface returnInterface {
  totalPageCount: number
  changePageHandler: (_: ChangeEvent<unknown>, page: number) => void
  itemsOnPageHandler: (e: SelectChangeEvent) => void
  itemsOnPage: string
  page: number
  cardsPacks: packType[] | undefined
}

export default function usePaginatedData(): returnInterface {
  const [itemsOnPage, setItemsOnPage] = useState<string>("10")
  const [page, setPage] = useState<number>(1)
  const { data } = useQuery({
    queryFn: () => packsApi.getPacks(page.toString(), itemsOnPage),
    queryKey: ["packs", page, itemsOnPage],
  })
  const itemsOnPageHandler = (e: SelectChangeEvent) => {
    const value = e.target.value as string
    setItemsOnPage(value)
    setPage(1)
  }
  let cardsPacks = undefined
  let totalPageCount = 1
  if (data?.data) {
    const { cardPacksTotalCount, pageCount, cardPacks: cards } = data.data
    totalPageCount = Math.ceil(cardPacksTotalCount / pageCount)
    cardsPacks = cards
  }

  const changePageHandler = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  return { totalPageCount, changePageHandler, itemsOnPageHandler, itemsOnPage, page, cardsPacks }
}
