import { API } from "@/src/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateCardsMutation = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: API.cards.createCards,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["cards"] })
    },
  })

  return { mutate }
}
