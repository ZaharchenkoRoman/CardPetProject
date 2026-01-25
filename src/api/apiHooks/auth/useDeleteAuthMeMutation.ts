import { useMutation } from "@tanstack/react-query"
import { API } from "@/src/api/api"
import { logoutUser } from "@/src/store/authSlice"
import { useAppDispatch } from "@/src/store/hooks"
import { useRouter } from "next/navigation"

export const useDeleteAuthMeMutation = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { mutate: deleteUser } = useMutation({
    mutationFn: API.auth.deleteAuthMe,
    onSuccess: () => {
      dispatch(logoutUser())
      router.push("/login")
    },
  })

  return { deleteUser }
}
