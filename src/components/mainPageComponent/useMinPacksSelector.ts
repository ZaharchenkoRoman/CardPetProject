import { ChangeEvent, useState } from "react"

export const useMinPacksSelector = () => {
  const [minPacks, setMinPacks] = useState<number>(0)
  const changeMinPacks = (e: ChangeEvent<HTMLInputElement>) => {
    const min = Number(e.currentTarget.value)

    if (min > 99) return setMinPacks(99)
    if (min === 0 || isNaN(Number(min))) {
      return setMinPacks(0)
    }
    setMinPacks(min)
  }
  return {
    minPacks,
    setMinPacks,
    changeMinPacks,
  }
}
