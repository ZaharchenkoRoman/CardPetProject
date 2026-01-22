import { Metadata } from "next";
import ForgotYourPassword from "@/src/components/authComponents/ForgotYourPasswordPage/ForgotYourPasswordPage";

export const metadata: Metadata = {
  title: "reset-password",
};

export default function resetPassword() {
  return <ForgotYourPassword />;
}
