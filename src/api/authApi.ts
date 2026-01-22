import { AxiosInstance } from "axios"

export class authApi {
  constructor(private instance: AxiosInstance) {}

  async register(data: { email: string; password: string }) {
    return await this.instance.post<{
      addedUser: string
      error?: string
    }>("auth/register", data)
  }

  async login(data: { email: string; password: string; rememberMe: boolean }) {
    return await this.instance.post<loginResponse>("auth/login", data)
  }

  async authMe() {
    return await this.instance.post<loginResponse>("auth/me")
  }

  async deleteAuthMe() {
    return await this.instance.delete("auth/me")
  }

  async changeAuthMe(data: { name: string | undefined; avatar: string | undefined }) {
    return await this.instance.put("auth/me", data)
  }
}

/*Types*/

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
