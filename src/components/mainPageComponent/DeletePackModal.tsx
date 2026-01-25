import Box from "@mui/material/Box"
import { IconButton, Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import { CustomButton } from "@/src/components/customButtons/CustomButton"
import Modal from "@mui/material/Modal"
import * as React from "react"
import { useDeletePackMutation } from "@/src/api/apiHooks/packs/useDeletePackMutation"

interface DeleteModalProps {
  deleteModal: boolean
  closeDeleteModal: () => void
  packId: string
  packName: string
}

export default function DeletePackModal(props: DeleteModalProps) {
  const { deleteModal, closeDeleteModal, packId, packName } = props
  const { mutate } = useDeletePackMutation()
  return (
    <Modal
      sx={{ fontFamily: "inherit" }}
      open={deleteModal}
      onClose={closeDeleteModal}
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
            Delete pack {packName}?
          </Typography>
          <IconButton onClick={closeDeleteModal}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Typography
          component={"div"}
          sx={{
            fontFamily: "inherit",
            my: "29px",
            alignItems: "center",

            ml: "24px",
            fontSize: "14px",
            fontWeight: "500px",
          }}
        >
          Do you really want to remove pack {packName}?<p>All cards will be deleted.</p>
        </Typography>

        <Stack
          flexDirection="row"
          sx={{ mb: "47px", mx: "24px", justifyContent: "space-between" }}
        >
          <CustomButton
            onClick={closeDeleteModal}
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
            onClick={() => mutate(packId)}
            sx={{
              height: "36px",
              width: "127px",
              background: "red",
              color: "white",
              boxShadow: " 0px 4px 18px 0px rgba(255, 54, 54, 0.35)",
            }}
          >
            Delete
          </CustomButton>
        </Stack>
      </Box>
    </Modal>
  )
}
