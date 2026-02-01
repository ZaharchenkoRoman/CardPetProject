import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Loader } from "@/src/components/common/Loader"

const ProfilePageLazy = dynamic(() => import("@/src/components/profileComponent/ProfilePage"), {
  ssr: true,
  loading: () => <Loader />,
})

export const metadata: Metadata = {
  title: "Profile",
}

export default function Profile() {
  return <ProfilePageLazy />
}
