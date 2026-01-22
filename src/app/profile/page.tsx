import { Metadata } from "next";
import { ProfilePage } from "@/src/components/profileComponent/ProfilePage";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Profile() {
  return <ProfilePage />;
}
