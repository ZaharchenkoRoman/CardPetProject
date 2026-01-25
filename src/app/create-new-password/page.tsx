import { Metadata } from "next"
import CreateNewPasswordPage from "@/src/components/authComponents/createNewPasswordPage/CreateNewPasswordPage"

export const metadata: Metadata = {
  title: "Create New Password",
}

const Page = () => {
  return <CreateNewPasswordPage />
}

export default Page
