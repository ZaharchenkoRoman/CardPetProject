import { useMutation } from "@tanstack/react-query"
import { API } from "@/src/api/api"

export const UseRegisterMutation = () => {
  const { mutate, error: mutationError } = useMutation({
    mutationFn: API.auth.register,
  })
  return { mutate, mutationError }
}
