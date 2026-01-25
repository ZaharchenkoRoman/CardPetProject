import { useQuery } from "@tanstack/react-query"
import { API } from "@/src/api/api"
import { useState } from "react"

export const useGetPacksQuery = () => {
  const [itemsOnPage, setItemsOnPage] = useState<string>("10")
  const [page, setPage] = useState<number>(1)
  const { data } = useQuery({
    queryFn: () => API.packs.getPacks(page.toString(), itemsOnPage),
    queryKey: ["packs"],
  })
  return { data, setItemsOnPage, setPage, itemsOnPage, page }
}
