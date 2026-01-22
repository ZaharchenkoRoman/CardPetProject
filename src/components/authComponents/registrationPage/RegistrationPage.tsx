import { AuthPageContainer } from "@/src/components/common/authContainers/AuthPageContainer"
import { AuthContainer } from "@/src/components/common/authContainers/AuthContainer"
import Link from "next/link"
import { RegistrationForm } from "@/src/components/authComponents/registrationPage/RegistrationForm"

export const RegistrationPage = () => {
  return (
    <AuthPageContainer>
      <AuthContainer>
        <h1 className={"mt-8.75 text-[26px] font-semibold"}>Sign Up</h1>
        <RegistrationForm />
        <p className={"mt-7.75 font-normal text-gray-500"}>Already have an account?</p>
        <Link
          className={"mt-1.75 mb-9.5 text-(--accent) underline"}
          href={"/login"}
        >
          Sign In
        </Link>
      </AuthContainer>
    </AuthPageContainer>
  )
}
