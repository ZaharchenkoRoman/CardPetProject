"use client"
import Image from "next/image"
import { CustomButton } from "@/src/components/customButtons/CustomButton"
import Link from "next/link"
import { AuthContainer } from "@/src/components/common/authContainers/AuthContainer"
import { AuthPageContainer } from "@/src/components/common/authContainers/AuthPageContainer"

export default function CheckEmailPage() {
  return (
    <AuthPageContainer>
      <AuthContainer>
        <h1 className={"mt-8.75 text-[26px] font-semibold"}>Check Email!</h1>
        <Image
          className={"mt-7.25"}
          alt={"mail"}
          src={"/pics/emailIcon.png"}
          width={108}
          height={108}
        ></Image>
        <p className={"mt-7.75 text-center font-normal text-gray-500"}>
          We sent an Email with instructions to
        </p>
        <p className={"text-(--secondary)"}>example@gmail.com</p>
        <Link
          href={"/login"}
          className={"mx-8.25 mb-12"}
        >
          <CustomButton sx={{ mt: "41px" }}>Back to login</CustomButton>
        </Link>
      </AuthContainer>
    </AuthPageContainer>
  )
}
