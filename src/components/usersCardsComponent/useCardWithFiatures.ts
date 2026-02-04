import { useState } from "react"
import { useDebounce } from "@/src/shared/customHooks/useDebounce"

export const useCardWithFeatures = () => {
  const [cardId, setCardId] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [searchValue, setSearchValue] = useState<string>("")
  const { debouncedValue } = useDebounce(searchValue, 1000)

  return { debouncedValue, page, setPage, cardId, setCardId, setSearchValue, searchValue }
}
