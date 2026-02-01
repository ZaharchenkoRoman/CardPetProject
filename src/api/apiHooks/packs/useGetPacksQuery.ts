import { useQuery } from "@tanstack/react-query"
import { API } from "@/src/api/api"

interface DtoType {
  page?: string
  itemsOnPage?: string
  packName: string | null
  min?: number
  max?: number
  user_id?: string
}

export const useGetPacksQuery = (props: DtoType) => {
  const { packName, page, itemsOnPage, max, min, user_id } = props
  const { data } = useQuery({
    queryFn: ({ signal }) =>
      API.packs.getPacks({ page, itemsOnPage, packName, max, min, user_id, signal }),
    queryKey: ["packs", page, itemsOnPage, packName, max, user_id, min],
  })
  return { data }
}
