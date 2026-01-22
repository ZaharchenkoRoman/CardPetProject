import { useMutation } from "@tanstack/react-query"
import { API } from "@/src/api/api"
import { useDispatch } from "react-redux"
import { loginUser } from "@/src/store/authSlice"
import { useRouter } from "next/navigation"

export const UseLoginMutation = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    mutate,
    isPending,
    error: loginMutationError,
  } = useMutation({
    mutationFn: API.auth.login,
    onSuccess: (data) => {
      dispatch(loginUser(data.data))
      router.push("/profile")
    },
  })

  return { mutate, loginMutationError, isPending }
}
