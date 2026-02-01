import { useChangeAuthMeMutation } from "@/src/api/apiHooks/auth/useChangeAuthMeMutation"
import { ChangeEvent, useRef, useState } from "react"
import { useAppSelector } from "@/src/store/hooks"

export const useChangeMeHandler = () => {
  const { avatar, email, name } = useAppSelector((state) => state.auth)
  const renameRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { changeMe, isPending } = useChangeAuthMeMutation()

  const selectPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const pic = e.target.files?.[0]
    if (pic) {
      const reader = new FileReader()
      reader.readAsDataURL(pic)
      reader.onloadend = () => {
        const profilePic = reader.result as string
        changeMe({ name, avatar: profilePic })
      }
    }
  }
  const submitRename = () => {
    setIsEditing(false)
    const newNickName = renameRef.current?.value as string
    changeMe({ name: newNickName, avatar: "" })
  }

  return {
    selectPhotoHandler,
    renameRef,
    isPending,
    submitRename,
    isEditing,
    setIsEditing,
    avatar,
    email,
    name,
  }
}
