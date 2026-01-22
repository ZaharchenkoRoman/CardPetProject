"use client"

import { CustomButton } from "@/src/components/customButtons/CustomButton"
import { CustomInputWithEye } from "@/src/components/customButtons/CustomInputWithEye"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  resetSchemaType,
  schema,
} from "@/src/components/authComponents/createNewPasswordPage/schema"
import { AuthContainer } from "@/src/components/common/authContainers/AuthContainer"
import { AuthPageContainer } from "@/src/components/common/authContainers/AuthPageContainer"
import { Typography } from "@mui/material"

const CreateNewPasswordPage = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<resetSchemaType>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  const submitHandler = (data: resetSchemaType) => {}
  return (
    <AuthPageContainer>
      <AuthContainer>
        <h1 className={"mt-8.75 text-[26px] font-semibold"}>Create new password?</h1>
        <form
          className={"mx-8.25 mb-12 flex flex-col items-center justify-center"}
          noValidate
          onSubmit={handleSubmit(submitHandler)}
        >
          <CustomInputWithEye
            {...register("password")}
            size={"small"}
            variant={"outlined"}
            label={"Password"}
            sx={{ mt: "65.2px" }}
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "inherit",
              marginTop: "18px",
              textAlign: "center",
              color: "var(--secondary)",
            }}
          >
            Create new password and we will send you <p>further instructions to email</p>
          </Typography>
          <Link href={"/login"}>
            <CustomButton
              type={"submit"}
              sx={{ width: "347px", height: "36px", mt: "65px" }}
            >
              Create new password
            </CustomButton>
          </Link>
        </form>
      </AuthContainer>
    </AuthPageContainer>
  )
}

export default CreateNewPasswordPage
