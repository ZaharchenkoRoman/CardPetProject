import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "@/src/api/api"

export const useDeletePackMutation = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: API.packs.deletePack,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["packs"] })
    },
  })
 
  return { mutate }
}

