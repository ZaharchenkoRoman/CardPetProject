"use client"

import { TextField } from "@mui/material"
import { CustomInputWithEye } from "@/src/components/customButtons/CustomInputWithEye"
import { CustomButton } from "@/src/components/customButtons/CustomButton"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { schema, schemaType } from "@/src/components/authComponents/registrationPage/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { AlertComponent } from "@/src/components/common/AlertComponent"
import { useEffect, useState } from "react"
import { API } from "@/src/api/api"

export const RegistrationForm = () => {
  const [errorTimer, setErrorTimer] = useState<boolean>()

  const { mutate, error: mutationError } = useMutation({
    mutationFn: API.auth.register,
  })
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
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setErrorTimer(false)

      return clearTimeout(timeOut)
    }, 2000)
  }, [mutationError])
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
