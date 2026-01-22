import { Metadata } from "next";
import { LoginPage } from "@/src/components/authComponents/loginPage/LoginPage";

export const metadata: Metadata = {
  title: {
    default: "Login",
    template: " %s | LoginPage ",
  },
};

export default function login() {
  return (
    <>
      <LoginPage />
    </>
  );
}
