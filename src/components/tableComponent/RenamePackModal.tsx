import Box from "@mui/material/Box"
import { Checkbox, FormControlLabel, IconButton, Stack, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import { CustomButton } from "@/src/components/customButtons/CustomButton"
import Modal from "@mui/material/Modal"
import * as React from "react"
import { useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { packsApi } from "@/src/api/packsApi"

interface Props {
  onCloseHandler: () => void
  open: boolean
  packId: string
}
export const RenamePackModal = (props: Props) => {
  const { onCloseHandler, open, packId: id } = props
  const titleRef = useRef<HTMLInputElement>(null)
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: packsApi.editPack,
    onSuccess: () => {
      onCloseHandler()
      return queryClient.invalidateQueries({ queryKey: ["packs"] })
    },
  })

  const editPackHandler = () => {
    if (!titleRef.current) {
      return null
    }
    const name = titleRef.current.value
    mutate({ id, name })
  }
  return (
    <>
      <Modal
        sx={{ fontFamily: "inherit" }}
        open={open}
        onClose={onCloseHandler}
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
              Edit Pack
            </Typography>
            <IconButton onClick={onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <TextField
            inputRef={titleRef}
            sx={{ marginTop: "35px", marginBottom: "30px", alignSelf: "center" }}
            variant={"standard"}
            placeholder={"Pack Name"}
            slotProps={{
              input: { style: { height: "48px", width: "347px", fontFamily: "inherit" } },
            }}
          ></TextField>

          <FormControlLabel
            slotProps={{
              typography: { fontFamily: "inherit", fontWeight: "500", fontSize: "16px" },
            }}
            sx={{ marginLeft: "24px", "&:hover": { color: "var(--accent)" } }}
            label={"Private pack"}
            control={
              <Checkbox
                onChange={() => setIsPrivate((prev) => !prev)}
                checked={isPrivate}
              ></Checkbox>
            }
          ></FormControlLabel>
          <Stack
            flexDirection="row"
            sx={{ mb: "47px", mx: "24px", mt: "35px", justifyContent: "space-between" }}
          >
            <CustomButton
              onClick={onCloseHandler}
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
              onClick={editPackHandler}
              sx={{ height: "36px", width: "127px", background: "var(--accent)", color: "white" }}
            >
              Save
            </CustomButton>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
