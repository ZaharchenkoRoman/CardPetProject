import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "@/src/api/api"

export const useUpdateCardMutation = () => {
  const queryClient = useQueryClient()
  const { mutate: editCardMutation } = useMutation({
    mutationFn: API.cards.putCard,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["cards"] })
    },
  })

  return {
    editCardMutation,
  }
}
