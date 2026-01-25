import { AxiosInstance } from "axios"

export class AuthApi {
  constructor(private instance: AxiosInstance) {}

  register = async (data: registerDTO) => {
    return await this.instance.post<registerResponse>("auth/register", data).then((res) => res.data)
  }

  login = async (data: loginDTO) => {
    return await this.instance.post<loginResponse>("auth/login", data).then((res) => res.data)
  }

  authMe = async () => {
    return await this.instance.post<loginResponse>("auth/me").then((res) => res.data)
  }

  deleteAuthMe = async () => {
    return await this.instance.delete("auth/me").then((res) => res.data)
  }

  changeAuthMe = async (data: changeAuthMeDTO) => {
    return await this.instance.put<changeAuthMeResponse>("auth/me", data).then((res) => res.data)
  }
}

/*Types*/

interface registerDTO {
  data: { email: string; password: string }
}
interface loginDTO {
  data: { email: string; password: string; rememberMe: boolean }
}
interface changeAuthMeDTO {
  name: string | undefined
  avatar: string | undefined
}

interface changeAuthMeResponse {
  updatedUser: loginResponse
  token: string
  tokenDeathTime: number
  error?: string
}

export interface loginResponse {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
}
interface registerResponse {
  addedUser: string
  error?: string
}
