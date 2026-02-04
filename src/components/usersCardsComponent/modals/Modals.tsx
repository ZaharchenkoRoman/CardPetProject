import { AddNewCardModal } from "@/src/components/usersCardsComponent/modals/AddNewCardModal"
import { EditCardModal } from "@/src/components/usersCardsComponent/modals/EditCardModal"
import { DeleteCardModal } from "@/src/components/usersCardsComponent/modals/DeleteCardModal"
import DeletePackModal from "@/src/components/mainPageComponent/DeletePackModal"
import { RenamePackModal } from "@/src/components/mainPageComponent/RenamePackModal"
import useModals from "./useModals"
interface Props {
  cardId: string | null
  decodedPackName: string
  packId: string | null
}
export default function Modals(props: Props) {
  const { decodedPackName, packId, cardId } = props
  const { deleteCardModal, changeCardContentModal, addCardModal, editPackModal, deletePackModal } =
    useModals()

  return (
    <>
      <addCardModal.ModalComponent>
        {({ isOpenModal, closeModalHandler }) => (
          <AddNewCardModal
            open={isOpenModal}
            handleClose={closeModalHandler}
          />
        )}
      </addCardModal.ModalComponent>
      <changeCardContentModal.ModalComponent>
        {({ isOpenModal, closeModalHandler }) => (
          <EditCardModal
            cardId={cardId}
            isOpenModal={isOpenModal}
            closeModalHandler={closeModalHandler}
          />
        )}
      </changeCardContentModal.ModalComponent>
      <deleteCardModal.ModalComponent>
        {({ isOpenModal, closeModalHandler }) => (
          <DeleteCardModal
            isOpenModal={isOpenModal}
            closeModalHandler={closeModalHandler}
            cardId={cardId}
          />
        )}
      </deleteCardModal.ModalComponent>
      <deletePackModal.ModalComponent>
        {({ isOpenModal, closeModalHandler }) => (
          <DeletePackModal
            deleteModal={isOpenModal}
            closeDeleteModal={closeModalHandler}
            packId={packId}
            packName={decodedPackName}
          ></DeletePackModal>
        )}
      </deletePackModal.ModalComponent>
      <editPackModal.ModalComponent>
        {({ isOpenModal, closeModalHandler }) => (
          <RenamePackModal
            packId={packId}
            packName={decodedPackName}
            onCloseHandler={closeModalHandler}
            open={isOpenModal}
          ></RenamePackModal>
        )}
      </editPackModal.ModalComponent>
    </>
  )
}
