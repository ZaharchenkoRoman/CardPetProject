import type { Metadata } from "next"
import CheckEmailPage from "@/src/components/authComponents/checkEmailPage/CheckEmailPage"
export const metadata: Metadata = {
  title: "Email Page",
}

const Page = () => {
  return <CheckEmailPage />
}

export default Page
