import { useMutation } from "@tanstack/react-query"
import { API } from "@/src/api/api"
import { logoutUser } from "@/src/store/authSlice"
import { useAppDispatch } from "@/src/store/hooks"
import { useRouter } from "next/navigation"

export const useDeleteAuthMeMutation = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { mutate: deleteUser, isPending: logoutPending } = useMutation({
    mutationFn: API.auth.deleteAuthMe,
    onSuccess: () => {
      router.push("/login")
      dispatch(logoutUser())
    },
  })

  return { deleteUser, logoutPending }
}
