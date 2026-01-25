import { useMutation } from "@tanstack/react-query"
import { API } from "@/src/api/api"
import { loginUser } from "@/src/store/authSlice"
import { useAppDispatch } from "@/src/store/hooks"

export const useAuthMeMutation = () => {
  const dispatch = useAppDispatch()
  const { mutate } = useMutation({
    mutationFn: API.auth.authMe,
    onSuccess: (data) => {
      dispatch(loginUser(data))
    },
    retry: 4,
  })

  return { mutate }
}
