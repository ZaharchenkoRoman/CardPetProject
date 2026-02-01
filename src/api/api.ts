import { AuthApi } from "@/src/api/authApi"
import axios, { AxiosInstance } from "axios"
import { QueryClient } from "@tanstack/query-core"
import { CardsApi } from "@/src/api/cardsApi"
import { PacksApi } from "@/src/api/packsApi"

export const queryClient = new QueryClient()

const BASE_URL = "http://localhost:7542/2.0/"
export const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const auth = new AuthApi(instance)
const cards = new CardsApi(instance)
const packs = new PacksApi(instance)

export const API = {
  auth: auth,
  cards: cards,
  packs: packs,
}
