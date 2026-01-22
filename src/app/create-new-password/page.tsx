import { Metadata } from "next";
import CreateNewPasswordPage from "@/src/components/authComponents/createNewPasswordPage/CreateNewPasswordPage";

export const metadata: Metadata = {
  title: "Create New Password",
};

const NewPassword = () => {
  return <CreateNewPasswordPage />;
};

export default NewPassword;
