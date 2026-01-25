"use client"

import { CustomButton } from "@/src/components/customButtons/CustomButton"
import { AuthPageContainer } from "@/src/components/common/authContainers/AuthPageContainer"
import { AuthContainer } from "@/src/components/common/authContainers/AuthContainer"
import { Avatar, Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAppSelector } from "@/src/store/hooks"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import { ChangeEvent, useRef, useState } from "react"
import DoneIcon from "@mui/icons-material/Done"
import Link from "next/link"
import { useDeleteAuthMeMutation } from "@/src/api/apiHooks/auth/useDeleteAuthMeMutation"
import { useChangeAuthMeMutation } from "@/src/api/apiHooks/auth/useChangeAuthMeMutation"

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { avatar, email, name } = useAppSelector((state) => state.auth)

  const renameRef = useRef<HTMLInputElement>(null)

  const { deleteUser } = useDeleteAuthMeMutation()

  const { changeMe } = useChangeAuthMeMutation()

  const selectPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const pic = e.target.files?.[0]
    if (pic) {
      const reader = new FileReader()
      reader.readAsDataURL(pic)
      reader.onloadend = () => {
        const profilePic = reader.result as string
        changeMe({ name, avatar: profilePic })
      }
    }
  }

  const submitRename = () => {
    setIsEditing(false)
    const newNickName = renameRef.current?.value as string
    changeMe({ name: newNickName, avatar: "" })
  }

  return (
    <>
      <Link href={"/"}>
        <Typography
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mt: "24px",
            ml: "136px",
            fontFamily: "inherit",
            ":hover": {
              color: "var(--accent)",
              cursor: "pointer",
            },
          }}
        >
          <KeyboardBackspaceIcon sx={{ mr: "8px", mb: "1px" }} />
          Back to Packs List
        </Typography>
      </Link>
      <AuthPageContainer sx={{ justifyContent: "start", height: "calc(100vh-160)" }}>
        <AuthContainer sx={{ mt: "12px" }}>
          <h1 className={"mx-21.5 mt-8.75 text-[26px] font-semibold"}>Personal information</h1>
          <Box
            marginTop={"30px"}
            position="relative"
          >
            <Avatar
              sx={{ height: "96px", width: "96px" }}
              src={avatar || "/pics/person.jpg"}
            ></Avatar>
            <label className={"cursor-pointer"}>
              <input
                onChange={selectPhotoHandler}
                type={"file"}
                className={"hidden"}
              />
              <Avatar
                sx={{
                  position: "absolute",
                  top: "58px",
                  right: "-5px",
                  height: "32",
                }}
                src={"/pics/cameraImg.svg"}
              ></Avatar>
            </label>
          </Box>
          {isEditing ? (
            <TextField
              inputRef={renameRef}
              defaultValue={name}
              size={"small"}
              label={"Nickname"}
              variant={"outlined"}
              sx={{ fontFamily: "inherit", mt: "17px", minHeight: "46px" }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position={"end"}>
                      <IconButton
                        size={"small"}
                        edge={"end"}
                      >
                        <DoneIcon onClick={submitRename} />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            >
              {name}
            </TextField>
          ) : (
            <Box
              paddingLeft={"40px"}
              marginTop={"17px"}
              gap={1}
              alignItems={"center"}
              justifyContent={"center"}
              display="flex"
              minHeight={"46px"}
            >
              <Typography sx={{ fontFamily: "inherit" }}>{name}</Typography>
              <IconButton
                size={"small"}
                edge={"end"}
              >
                <DriveFileRenameOutlineIcon onClick={() => setIsEditing(true)} />
              </IconButton>
            </Box>
          )}
          <Typography
            alignItems={"center"}
            justifyContent={"center"}
            mt={"17px"}
            fontFamily={"inherit"}
            color={"var(--secondary)"}
          >
            {email}
          </Typography>
          <CustomButton
            onClick={() => deleteUser()}
            startIcon={<LogoutIcon />}
            sx={{
              height: "36px",
              width: "127px",
              mt: "29px",
              mb: "36px",
              color: "black",
              background: "white",
              boxShadow: "0px 2px 10px 0px rgba(109, 109, 109, 0.25)",
            }}
          >
            Log out
          </CustomButton>
        </AuthContainer>
      </AuthPageContainer>
    </>
  )
}
