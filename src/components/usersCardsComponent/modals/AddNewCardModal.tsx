import Box from "@mui/material/Box"
import { IconButton, MenuItem, Select, Stack, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import { CustomButton } from "@/src/shared/customButtons/CustomButton"
import Modal from "@mui/material/Modal"
import useCreateCardMutation from "@/src/components/mainPageComponent/useCreateCardModal"
import { useRef } from "react"
import { useSearchParams } from "next/navigation"

interface AddNewCardModalProps {
  open: boolean
  handleClose: () => void
}

export const AddNewCardModal = (props: AddNewCardModalProps) => {
  const { handleClose, open } = props
  const { createNewCard } = useCreateCardMutation()
  const questionRef = useRef<HTMLInputElement | null>(null)
  const answerRef = useRef<HTMLInputElement | null>(null)
  const params = useSearchParams()
  const packId = params.get("id")
  const createHandler = () => {
    const question = questionRef.current?.value as string
    const answer = answerRef.current?.value as string
    if (packId) {
      createNewCard({ packId, answer, question })
    }
  }
  const submitHandler = () => {
    createHandler()
    handleClose()
  }
  return (
    <Modal
      sx={{ fontFamily: "inherit" }}
      open={open}
      onClose={handleClose}
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
            Add new Card
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box
          component={"div"}
          sx={{ ml: "24px" }}
        >
          <Typography sx={{ fontFamily: "inherit", mt: "21px", color: "var(--secondary)" }}>
            Choose a question format
          </Typography>
          <Select
            defaultValue={"text"}
            size={"small"}
            sx={{ mt: "8px", width: "350px" }}
          >
            <MenuItem value={"text"}>Text</MenuItem>
            <MenuItem value={"number"}>Number</MenuItem>
            <MenuItem value={"pic"}>Pic</MenuItem>
          </Select>
        </Box>
        <TextField
          inputRef={questionRef}
          sx={{ marginTop: "25px", marginBottom: "30px", alignSelf: "center" }}
          variant={"standard"}
          placeholder={"Question"}
          slotProps={{
            input: { style: { height: "48px", width: "347px", fontFamily: "inherit" } },
          }}
        ></TextField>
        <TextField
          inputRef={answerRef}
          sx={{ marginTop: "25px", marginBottom: "30px", alignSelf: "center" }}
          variant={"standard"}
          placeholder={"Answer"}
          slotProps={{
            input: { style: { height: "48px", width: "347px", fontFamily: "inherit" } },
          }}
        ></TextField>
        <Stack
          flexDirection="row"
          sx={{ mb: "47px", mx: "24px", mt: "35px", justifyContent: "space-between" }}
        >
          <CustomButton
            onClick={handleClose}
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
            sx={{ height: "36px", width: "127px", background: "var(--accent)", color: "white" }}
          >
            Save
          </CustomButton>
        </Stack>
      </Box>
    </Modal>
  )
}
AddNewCardModal.displayName = "AddNewCardModal"
