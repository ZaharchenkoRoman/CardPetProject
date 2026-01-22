import { Metadata } from "next"
import { RegistrationPage } from "@/src/components/authComponents/registrationPage/RegistrationPage"

export const metadata: Metadata = {
  title: "Registration",
}

const Registration = () => {
  return <RegistrationPage />
}

export default Registration
