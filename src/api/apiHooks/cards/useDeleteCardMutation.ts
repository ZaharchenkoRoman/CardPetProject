import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "@/src/api/api"

export const useDeleteCardMutation = () => {
 const queryClient = useQueryClient()
 const {mutate: deleteCardMutation} = useMutation({
   mutationFn: API.cards.deleteCard,
   onSuccess: () => {
     return queryClient.invalidateQueries({queryKey: ["cards"]})
   }
 })
 
 
  return { deleteCardMutation }
}

