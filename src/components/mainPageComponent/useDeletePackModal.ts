import { useState } from "react"

export default function useDeletePackModal() {
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [nameDeletePack, setNameDeletePack] = useState<string>("")
  const [isDeletePack, setIsDeletePack] = useState<string>("")

  const openDeleteModal = (id: string, name: string) => {
    setNameDeletePack(name)
    setIsDeletePack(id)
    setDeleteModal(true)
  }

  const closeDeleteModal = () => setDeleteModal(false)

  return {
    deleteModal,
    nameDeletePack,
    isDeletePack,
    openDeleteModal,
    closeDeleteModal,
  }
}
