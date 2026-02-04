import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { Checkbox, FormControlLabel, IconButton, Stack, TextField } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { CustomButton } from "@/src/shared/customButtons/CustomButton"
import { useCreatePackHandler } from "@/src/components/mainPageComponent/useCreatePackHandler"
import { Loader } from "@/src/components/common/Loader"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
interface Props {
  open: boolean
  handleClose: () => void
}

export default function CreatePackModal(props: Props) {
  const [cover, setCover] = useState<string | null>(null)
  const { handleClose, open } = props
  const { createPackHandler, setIsPrivate, isPrivate, nameRef, isPending } = useCreatePackHandler(
    cover,
    handleClose
  )

  const changeCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const cover = e.target.files?.[0]
    if (cover) {
      const reader = new FileReader()
      reader.readAsDataURL(cover)
      reader.onloadend = () => {
        setCover(reader.result as string)
      }
    }
  }

  return (
    <>
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
          {isPending && <Loader />}
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
              Add new pack?
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box
            display={"flex"}
            mt={"33px"}
            flexDirection={"row"}
          >
            <span className={"ml-6 pr-45"}>Cover</span>
            <label className={"mr-6 cursor-pointer hover:text-(--accent)"}>
              Change Cover
              <TextField
                onChange={changeCoverHandler}
                type={"file"}
                hidden
              ></TextField>
            </label>
          </Box>
          <Image
            className={"mt-2.5 justify-center self-center"}
            src={cover || "/pics/cover.svg"}
            alt={"cover"}
            height={200}
            width={350}
          ></Image>
          <TextField
            inputRef={nameRef}
            sx={{ marginTop: "35px", marginBottom: "30px", alignSelf: "center" }}
            variant={"standard"}
            placeholder={"Pack Name"}
            slotProps={{
              input: {
                style: {
                  height: "48px",
                  width: "347px",
                  fontFamily: "inherit",
                },
              },
            }}
          ></TextField>

          <FormControlLabel
            slotProps={{
              typography: {
                fontFamily: "inherit",
                fontWeight: "500",
                fontSize: "16px",
              },
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
            sx={{
              mb: "47px",
              mx: "24px",
              mt: "35px",
              justifyContent: "space-between",
            }}
          >
            <CustomButton
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
              onClick={createPackHandler}
              sx={{
                height: "36px",
                width: "127px",
                background: "var(--accent)",
                color: "white",
              }}
            >
              Save
            </CustomButton>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
