import { useCustomModal } from "@/src/shared/customHooks/useCustomModal"

export default function UseModals() {
  const changeCardContentModal = useCustomModal()
  const deleteCardModal = useCustomModal()
  const deletePackModal = useCustomModal()
  const editPackModal = useCustomModal()
  const addCardModal = useCustomModal()

  return {
    addCardModal,
    deleteCardModal,
    changeCardContentModal,
    deletePackModal,
    editPackModal,
  }
}
