"use client"
import Link from "next/dist/client/link"
import { CustomButton } from "@/src/components/customButtons/CustomButton"
import { Checkbox, TextField } from "@mui/material"
import { CustomInputWithEye } from "@/src/components/customButtons/CustomInputWithEye"
import { loginSchema, LoginSchemaType } from "@/src/components/authComponents/loginPage/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { AlertComponent } from "@/src/components/common/AlertComponent"
import { useEffect, useState } from "react"
import { UseLoginMutation } from "@/src/api/apiHooks/auth/useLoginMutation"
import { Loader } from "@/src/components/common/Loader"

export const LoginForm = () => {
  const [errorTimer, setErrorTimer] = useState<boolean>(true)
  const { mutate, loginMutationError, isPending } = UseLoginMutation()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  })

  const submitHandler = (data: LoginSchemaType) => {
    mutate(data)
    setErrorTimer(true)
    reset()
  }

  const errorHandler = () => {
    if (loginMutationError instanceof AxiosError) {
      if (loginMutationError.response?.data.error) {
        return loginMutationError.response.data.error
      }
    }
    return "Login failed."
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorTimer(false)
      return clearTimeout(timeout)
    }, 3000)
  }, [loginMutationError])

  return (
    <>
      {isPending && <Loader />}
      <form
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        className={"flex flex-col items-center"}
      >
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message as string}
          {...register("email")}
          type={"email"}
          sx={{ mt: "41px", width: "347px", mx: "33px", height: "46px" }}
          label={"Email"}
          variant={"outlined"}
          size={"small"}
        ></TextField>
        <div>
          <CustomInputWithEye
            autoComplete={"password"}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message as string}
            size={"small"}
            label={"Password"}
            variant={"outlined"}
            sx={{
              mt: "24px",
              width: "347px",
            }}
          />
        </div>
        <div className={"ml-8.25 flex items-center self-start"}>
          <label className={"mt-5 cursor-pointer hover:text-(--accent)"}>
            <Checkbox
              disableRipple
              defaultChecked
              {...register("rememberMe")}
            />
            <span
              className={"font-normal"}
              style={{ fontSize: "14px" }}
            >
              Remember me
            </span>
          </label>
        </div>
        <Link
          className={"mt-4.75 self-end font-normal"}
          style={{ fontSize: "14px" }}
          href={"/reset-password"}
        >
          <p className={"mr-8.25 mb-15 hover:text-(--accent)"}>Forgot Password?</p>
        </Link>
        <CustomButton
          disabled={isPending}
          type={"submit"}
        >
          Sign In
        </CustomButton>
      </form>
      {loginMutationError && errorTimer && <AlertComponent>{errorHandler()}</AlertComponent>}
    </>
  )
}
