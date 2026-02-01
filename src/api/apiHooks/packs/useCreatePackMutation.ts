import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "@/src/api/api"

export const useCreatePackMutation = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: API.packs.postPack,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["packs"] })
    },
  })
  return {
    mutate,
    isPending,
    isSuccess,
  }
}
