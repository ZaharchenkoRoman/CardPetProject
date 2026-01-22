import { authApi } from "@/src/api/authApi"
import axios from "axios"
import { QueryClient } from "@tanstack/query-core"

export const queryClient = new QueryClient()
const BASE_URL = "http://localhost:7542/2.0/"
export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
const auth = new authApi(instance)

export const API = {
  auth: auth,
}
