import { useRef, useState } from "react"
import { useEditPackMutation } from "@/src/api/apiHooks/packs/useEditPackMutation"
import { ParamValue } from "next/dist/server/request/params"
interface Props {
  packId: string | null
  onCloseHandler: () => void
  packName: ParamValue | null
}
export const useRenamePackModal = (props: Props) => {
  const { onCloseHandler, packId, packName } = props
  const titleRef = useRef<HTMLInputElement>(null)
  const [isPrivate, setIsPrivate] = useState<boolean>(false)

  const editPackHandler = () => {
    if (!titleRef.current) {
      return null
    }
    const name = titleRef.current.value
    mutate({ id: packId, name })
    onCloseHandler()
  }

  const { mutate } = useEditPackMutation({ packName, packId })

  return { titleRef, isPrivate, setIsPrivate, editPackHandler }
}
