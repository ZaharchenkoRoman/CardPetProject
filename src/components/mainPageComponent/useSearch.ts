import { ChangeEvent, useState } from "react"

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState<string | null>("")
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  return { searchValue, searchHandler, setSearchValue }
}
