import { Box, Stack, Typography } from "@mui/material"
import Image from "next/image"
import { CustomButton } from "@/src/shared/customButtons/CustomButton"
import Link from "next/link"
export default function NotFound() {
  return (
    <Stack
      height={"calc(100vh - 64px)"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        mr={"62px"}
        textAlign={"center"}
      >
        <h1 className={"mb-2.75 text-5xl font-extrabold"}>Ooops!</h1>
        <h2>Sorry! Page not found!</h2>
        <Link href={"/"}>
          <CustomButton sx={{ mt: "36px" }}>Back to home page</CustomButton>
        </Link>
      </Box>
      <Image
        src="/pics/404.svg"
        alt="404"
        width={451}
        height={192}
      />
    </Stack>
  )
}
