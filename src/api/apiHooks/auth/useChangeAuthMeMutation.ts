import { useMutation } from "@tanstack/react-query"
import { API } from "@/src/api/api"
import { useAppDispatch } from "@/src/store/hooks"
import { loginUser } from "@/src/store/authSlice"

export const useChangeAuthMeMutation = () => {
  const dispatch = useAppDispatch()
  const { mutate: changeMe, isPending } = useMutation({
    mutationFn: API.auth.changeAuthMe,
    onSuccess: (data) => {
      dispatch(loginUser(data.updatedUser))
    },
  })

  return {
    changeMe,
    isPending,
  }
}
