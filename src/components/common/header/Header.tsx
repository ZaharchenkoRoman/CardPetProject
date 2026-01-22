"use client"
import Image from "next/image"
import { CustomButton } from "@/src/components/customButtons/CustomButton"
import Link from "next/link"
import { useAppSelector } from "@/src/store/hooks"
import { Avatar, Box, Stack, Typography } from "@mui/material"

export default function Header() {
  const { avatar, name } = useAppSelector((state) => state.auth)

  return (
    <Box
      className={
        "flex h-15 flex-row items-center justify-between px-34 shadow-[0px_2px_10px_0px_rgba(109,109,109,0.25)]"
      }
    >
      <Link href={"/"}>
        <Image
          className={"ml-2.5 transition-all duration-300 ease-in hover:scale-110"}
          src={"/pics/logo.svg"}
          alt={"Logo"}
          height={40}
          width={40}
          priority={true}
        ></Image>
      </Link>
      {!name ? (
        <Link href={"/login"}>
          <CustomButton
            sx={{
              mr: "10px",
              mt: "0px",
              width: "113px",
              height: "36px",
            }}
          >
            Sign in
          </CustomButton>
        </Link>
      ) : (
        <Link href={"/profile"}>
          <Stack
            flexDirection={"row"}
            gap={"12px"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              ":hover": {
                color: "var(--accent)",
              },
            }}
          >
            <Typography
              fontFamily={"inherit"}
              fontSize={"16px"}
              fontWeight={"500"}
            >
              {name}
            </Typography>
            <Avatar
              sx={{ height: "36" }}
              src={avatar || "/pics/person.png"}
            ></Avatar>
          </Stack>
        </Link>
      )}
    </Box>
  )
}
