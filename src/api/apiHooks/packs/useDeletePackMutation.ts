import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "@/src/api/api"
import { useRouter } from "next/navigation"

export const useDeletePackMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: API.packs.deletePack,
    onSuccess: () => {
      router.push("/")
      return queryClient.invalidateQueries({ queryKey: ["packs"] })
    },
  })

  return { mutate }
}
