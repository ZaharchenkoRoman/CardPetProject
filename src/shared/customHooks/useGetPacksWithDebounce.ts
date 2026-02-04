import { useGetPacksQuery } from "@/src/api/apiHooks/packs/useGetPacksQuery"
import { useDebounce } from "@/src/shared/customHooks/useDebounce"
import { SelectChangeEvent } from "@mui/material"
import { ChangeEvent, useState } from "react"
import { useAppSelector } from "@/src/store/hooks"
import { useMinPacksSelector } from "@/src/components/mainPageComponent/useMinPacksSelector"

export const useGetPacksWithDebounce = (text: string | null) => {
  const { minPacks, changeMinPacks, setMinPacks } = useMinPacksSelector()
  const { _id } = useAppSelector((state) => state.auth)
  const [alignment, setAlignment] = useState<"All" | "My" | null>(null)
  const { debouncedValue } = useDebounce(text, 1000)
  const [itemsOnPage, setItemsOnPage] = useState<string>("10")
  const [page, setPage] = useState<number>(1)
  const { debouncedValue: minValueOfPacks } = useDebounce(minPacks, 500)
  const { data } = useGetPacksQuery({
    packName: debouncedValue,
    page: String(page),
    itemsOnPage,
    user_id: alignment === "My" ? _id : undefined,
    min: minValueOfPacks,
  })
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

  return {
    setMinPacks,
    cardsPacks,
    page,
    itemsOnPageHandler,
    changePageHandler,
    totalPageCount,
    itemsOnPage,
    setAlignment,
    alignment,
    changeMinPacks,
    minPacks,
  }
}
