"use client"

import { TextField } from "@mui/material"
import { CustomInputWithEye } from "@/src/shared/customButtons/CustomInputWithEye"
import { CustomButton } from "@/src/shared/customButtons/CustomButton"
import { useForm } from "react-hook-form"
import { schema, schemaType } from "@/src/components/authComponents/registrationPage/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { AlertComponent } from "@/src/components/common/AlertComponent"
import { useEffect, useState } from "react"
import { UseRegisterMutation } from "@/src/api/apiHooks/auth/useRegisterMutation"

export const RegistrationForm = () => {
  const { mutationError, mutate } = UseRegisterMutation()
  const [errorTimer, setErrorTimer] = useState<boolean>()

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setErrorTimer(false)

      return clearTimeout(timeOut)
    }, 2000)
  }, [mutationError])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<schemaType>({ mode: "onBlur", resolver: zodResolver(schema) })

  const submitFunc = (data: schemaType) => {
    setErrorTimer(true)
    mutate(data)
  }
  const getErrorMessage = () => {
    if (mutationError instanceof AxiosError) {
      if (mutationError.response?.data?.error) {
        return mutationError.response.data.error
      }
    }
    return "Operation failed"
  }

  return (
    <>
      <form
        noValidate
        className={"flex flex-col items-center justify-center"}
        id={"regForm"}
        onSubmit={handleSubmit(submitFunc)}
      >
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message as string}
          {...register("email")}
          type={"email"}
          sx={{ mt: "41px", width: "347px", height: "48px", mx: "33px" }}
          label={"Email"}
          variant={"outlined"}
          size={"small"}
        />
        <CustomInputWithEye
          error={!!errors.password}
          helperText={errors.password?.message as string}
          {...register("password")}
          sx={{ mt: "24px" }}
          label={"Password"}
          variant={"outlined"}
          size={"small"}
          autoComplete={"password"}
        />
        <CustomInputWithEye
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message as string}
          {...register("confirmPassword")}
          sx={{ mt: "24px" }}
          label={"Confirm Password"}
          variant={"outlined"}
          size={"small"}
          autoComplete={"password"}
        />
        <CustomButton
          type={"submit"}
          sx={{ mt: "60px" }}
        >
          Sign Up
        </CustomButton>
      </form>
      {mutationError && errorTimer && <AlertComponent>{getErrorMessage()}</AlertComponent>}
    </>
  )
}
