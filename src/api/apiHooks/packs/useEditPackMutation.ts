import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "@/src/api/api"
import { usePathname, useRouter } from "next/navigation"
import { ParamValue } from "next/dist/server/request/params"

export const useEditPackMutation = (props: {
  packName: ParamValue | null
  packId: string | null
}) => {
  const { packName, packId } = props
  const pathname = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: API.packs.editPack,
    onSuccess: (data) => {
      const newName = data.updatedCardsPack.name
      if (pathname === `/my-packs/${packName}`) {
        router.replace(`/my-packs/${newName}?id=${packId}`)
      }

      return queryClient.invalidateQueries({ queryKey: ["packs"] })
    },
  })

  return { mutate }
}
