"use client"

import dynamic from "next/dynamic"
import { Loader } from "@/src/components/common/Loader"

const MainPageLazy = dynamic(() => import("@/src/components/mainPageComponent/MainPage"), {
  ssr: false,
  loading: () => <Loader />,
})

export default function Home() {
  return <MainPageLazy />
}
