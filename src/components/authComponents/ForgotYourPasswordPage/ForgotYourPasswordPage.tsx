"use client"

import { CustomButton } from "@/src/components/customButtons/CustomButton"
import Link from "next/link"
import { TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  EmailRecoveryType,
  schema,
} from "@/src/components/authComponents/ForgotYourPasswordPage/schema"
import { AuthContainer } from "@/src/components/common/authContainers/AuthContainer"
import { AuthPageContainer } from "@/src/components/common/authContainers/AuthPageContainer"

const ForgotYourPassword = () => {
  const {
    formState: { errors },
    register,
  } = useForm<EmailRecoveryType>({ mode: "onBlur", resolver: zodResolver(schema) })
  return (
    <AuthPageContainer>
      <AuthContainer>
        <h1 className={"mt-8.75 text-[26px] font-semibold"}>Forgot your password?</h1>
        <form
          className={"flex flex-col items-center justify-center"}
          noValidate
        >
          <TextField
            error={!!errors.email}
            helperText={errors.email?.message as string}
            {...register("email")}
            label={"Email"}
            variant={"outlined"}
            size={"small"}
            sx={{
              mt: "65.2px",
              mb: "26px",
              width: "347px",
              height: "46px",
            }}
          ></TextField>
          <p
            className={"w-86.75 font-normal text-(--secondary)"}
            style={{ fontSize: "14px" }}
          >
            Enter your email address and we will send you further instructions
          </p>
          <CustomButton
            type={"submit"}
            sx={{ width: "347px", height: "36px", mt: "65px", mx: "33px" }}
          >
            Send instructions
          </CustomButton>
        </form>
        <p className={"mt-7.75 text-center font-normal text-gray-500"}>
          Did you remember your password?
        </p>
        <Link href={"/login"}>
          <p className={"mt-1.75 mb-9.5 text-(--accent) underline"}>Try logging in</p>
        </Link>
      </AuthContainer>
    </AuthPageContainer>
  )
}

export default ForgotYourPassword
