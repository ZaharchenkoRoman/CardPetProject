import { useAppSelector } from "@/src/store/hooks"
import { useAuthMeMutation } from "@/src/api/apiHooks/auth/useAuthMeMutation"
import { useEffect } from "react"

export const useAuthMe = () => {
  const { name } = useAppSelector((state) => state.auth)
  const { mutate: authMe } = useAuthMeMutation()

  useEffect(() => {
    authMe()
  }, [authMe, name])

  return { name }
}
