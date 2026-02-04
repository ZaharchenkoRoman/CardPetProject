import { useParams, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { API } from "@/src/api/api"
interface Props {
  debouncedValue: string | null
  page: number
  ITEMS_PER_PAGE: number
}
export const useGetCardsQuery = (props: Props) => {
  const { debouncedValue, page, ITEMS_PER_PAGE } = props
  const { packName } = useParams()
  const params = useSearchParams()
  const packId = params.get("id")
  const { data } = useQuery({
    queryKey: ["cards", packId, debouncedValue, page, ITEMS_PER_PAGE],
    queryFn: () =>
      API.cards.getCards({ packId, cardQuestion: debouncedValue, page, pageCount: ITEMS_PER_PAGE }),
  })

  const decodedPackName = decodeURIComponent(packName as string)
  return { decodedPackName, data, packId }
}
