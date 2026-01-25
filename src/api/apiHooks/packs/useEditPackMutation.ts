import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "@/src/api/api"

export const useEditPackMutation = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: API.packs.editPack,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["packs"] })
    },
  })

  return { mutate }
}
