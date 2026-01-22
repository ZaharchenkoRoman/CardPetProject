import Link from "next/dist/client/link"
import { AuthContainer } from "@/src/components/common/authContainers/AuthContainer"
import { AuthPageContainer } from "@/src/components/common/authContainers/AuthPageContainer"
import { LoginForm } from "@/src/components/authComponents/loginPage/LoginForm"
import { Typography } from "@mui/material"

export const LoginPage = () => {
  return (
    <AuthPageContainer>
      <AuthContainer>
        <Typography
          fontFamily={"inherit"}
          component={"h1"}
          marginTop={"35px"}
          fontSize={"26px"}
          fontWeight={"bold"}
        >
          Sign In
        </Typography>
        <LoginForm />
        <Typography
          fontFamily={"inherit"}
          marginTop={"31px"}
          fontWeight={"normal"}
          color={"var(--secondary)"}
        >
          Don&apos;t have an account?
        </Typography>

        <Link href={"/registration"}>
          <Typography
            fontFamily={"inherit"}
            marginTop={"7px"}
            marginBottom={"48px"}
            color={"var(--accent)"}
            sx={{ textDecoration: "underline" }}
          >
            Sign Up
          </Typography>
        </Link>
      </AuthContainer>
    </AuthPageContainer>
  )
}
