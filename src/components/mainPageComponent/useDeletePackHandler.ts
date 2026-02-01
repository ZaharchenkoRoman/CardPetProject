import { useDeletePackMutation } from "@/src/api/apiHooks/packs/useDeletePackMutation"
interface Props {
  packId: string | null
  closeDeleteModal: () => void
}
export const useDeletePackHandler = (props: Props) => {
  const { packId, closeDeleteModal } = props
  const { mutate } = useDeletePackMutation()
  const submitHandler = () => {
    mutate(packId)
    closeDeleteModal()
  }

  return { submitHandler }
}
