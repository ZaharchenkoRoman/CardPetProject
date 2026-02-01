import { useParams, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { API } from "@/src/api/api"

export const useGetCardsQuery = () => {
  const { packName } = useParams()

  const params = useSearchParams()
  const packId = params.get("id")
  const { data } = useQuery({
    queryKey: ["cards", packId],
    queryFn: () => API.cards.getCards(packId),
  })
  const decodedPackName = decodeURIComponent(packName as string)

  return { decodedPackName, data, packId }
}
