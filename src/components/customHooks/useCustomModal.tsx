import { ReactNode, useState } from "react"

interface childrenProps {
  children: (props: propsType) => ReactNode
}
interface propsType {
  isOpenModal: boolean
  closeModalHandler: () => void
}
export const useCustomModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const OpenModalHandler = () => setIsOpenModal(true)
  const closeModalHandler = () => setIsOpenModal(false)

  const ModalComponent = ({ children }: childrenProps) => {
    if (!isOpenModal) return null
    return <>{children({ isOpenModal, closeModalHandler })}</>
  }

  return { ModalComponent, OpenModalHandler, isOpenModal, closeModalHandler }
}
