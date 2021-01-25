import { BusinessUser } from "./BusinessUser";

export interface User {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  businessUser?: BusinessUser
}

export interface UserResponse {
  user?: User
  success: boolean
  message?: string
}