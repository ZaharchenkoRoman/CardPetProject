import { ChangeEvent } from "react"

import { SelectChangeEvent } from "@mui/material"
import { useGetPacksQuery } from "@/src/api/apiHooks/packs/useGetPacksQuery"

export default function usePaginatedTable() {
  const { data, setPage, setItemsOnPage, page, itemsOnPage } = useGetPacksQuery()

  const itemsOnPageHandler = (e: SelectChangeEvent) => {
    const value = e.target.value as string
    setItemsOnPage(value)
    setPage(1)
  }

  let cardsPacks = undefined
  let totalPageCount = 1
  if (data) {
    const { cardPacksTotalCount, pageCount, cardPacks: cards } = data
    totalPageCount = Math.ceil(cardPacksTotalCount / pageCount)
    cardsPacks = cards
  }

  const changePageHandler = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return { totalPageCount, changePageHandler, itemsOnPageHandler, itemsOnPage, page, cardsPacks }
}
