import { useRef, useState } from "react"
import { useCreatePackMutation } from "@/src/api/apiHooks/packs/useCreatePackMutation"

export const useCreatePackHandler = (cover: string | null, handleClose: () => void) => {
  const { mutate, isPending, isSuccess } = useCreatePackMutation()
  const createPackHandler = () => {
    const newPack = { name: nameRef.current?.value, private: isPrivate, deckCover: cover }
    mutate(newPack)
    handleClose()
  }

  const nameRef = useRef<HTMLInputElement>(null)
  const [isPrivate, setIsPrivate] = useState(false)

  return { isPrivate, setIsPrivate, createPackHandler, nameRef, isPending, isSuccess }
}
