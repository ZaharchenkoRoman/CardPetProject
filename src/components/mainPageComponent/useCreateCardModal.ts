import { useSearchParams } from "next/navigation"
import { useRef } from "react"
import { useCreateCardsMutation } from "@/src/api/apiHooks/cards/useCreateCardsMutation"

export default function useCreateCardModal() {
  const { mutate: createNewCard } = useCreateCardsMutation()

  return {
    createNewCard,
  }
}
