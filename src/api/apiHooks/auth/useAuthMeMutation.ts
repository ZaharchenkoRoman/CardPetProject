import { useMutation } from "@tanstack/react-query"
import { API } from "@/src/api/api"
import { loginUser } from "@/src/store/authSlice"
import { useAppDispatch } from "@/src/store/hooks"
import { usePathname, useRouter } from "next/navigation"

export const useAuthMeMutation = () => {
  const path = usePathname()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: API.auth.authMe,
    onSuccess: (data) => {
      dispatch(loginUser(data))
    },
    onError: () => {
      if (path !== "/registration") {
        router.push("/login")
      }
    },
    retry: 1,
  })

  return { mutate }
}
