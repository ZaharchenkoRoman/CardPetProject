import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cardsApi } from "@/src/api/cardsApi"
import { useSearchParams } from "next/navigation"
import { RefObject, useRef, useState } from "react"

interface returnTypes {
  openNewCardModal: boolean
  HandleOpen: () => void
  HandleClose: () => void
  questionRef: RefObject<HTMLInputElement | null>
  answerRef: RefObject<HTMLInputElement | null>
  packId: string | null
  createHandler: () => void
}
export default function UseCreateCardModal(): returnTypes {
  const queryClient = useQueryClient()
  const [openNewCardModal, setOpenNewCardModal] = useState<boolean>(false)
  const HandleOpen = () => setOpenNewCardModal(true)
  const HandleClose = () => setOpenNewCardModal(false)
  const questionRef = useRef<HTMLInputElement | null>(null)
  const answerRef = useRef<HTMLInputElement | null>(null)
  const params = useSearchParams()
  const packId = params.get("id")

  const { mutate } = useMutation({
    mutationFn: cardsApi.createCards,
    onSuccess: () => {
      HandleClose()
      return queryClient.invalidateQueries({ queryKey: ["cards"] })
    },
  })

  const createHandler = () => {
    const question = questionRef.current?.value as string
    const answer = answerRef.current?.value as string
    if (packId) {
      mutate({ packId, answer, question })
    }
  }

  return {
    answerRef,
    questionRef,
    openNewCardModal,
    HandleClose,
    HandleOpen,
    packId,
    createHandler,
  }
}
