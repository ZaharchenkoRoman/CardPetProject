import Box from "@mui/material/Box"
import { Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import { CustomButton } from "@/src/shared/customButtons/CustomButton"
import Modal from "@mui/material/Modal"
import { useDeleteCardMutation } from "@/src/api/apiHooks/cards/useDeleteCardMutation"

interface Props {
  isOpenModal: boolean
  closeModalHandler: () => void
  cardId: string | null
}
export const DeleteCardModal = (props: Props) => {
  const { closeModalHandler, isOpenModal, cardId } = props
  const { deleteCardMutation } = useDeleteCardMutation()
  const submitHandler = () => {
    deleteCardMutation(cardId)
    closeModalHandler()
  }
  return (
    <Modal
      sx={{ fontFamily: "inherit" }}
      open={isOpenModal}
      onClose={closeModalHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
        }}
      >
        <Stack
          borderBottom={"1px solid var(--secondary)"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={"24px"}
          py={"19px"}
        >
          <Typography
            sx={{ fontSize: "18px", fontFamily: "inherit", fontWeight: "500" }}
            component={"h1"}
          >
            Delete Card
          </Typography>
        </Stack>
        <Stack
          flexDirection="row"
          sx={{ mb: "47px", mx: "24px", mt: "35px", justifyContent: "space-between" }}
        >
          <CustomButton
            onClick={closeModalHandler}
            sx={{
              height: "36px",
              width: "127px",
              background: "white",
              color: "black",
              boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={submitHandler}
            sx={{
              background: "red",
              height: "36px",
              width: "127px",
              color: "white",
            }}
          >
            Delete
          </CustomButton>
        </Stack>
      </Box>
    </Modal>
  )
}
