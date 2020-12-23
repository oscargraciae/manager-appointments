export interface User {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface UserResponse {
  user?: User
  success: boolean
  message?: string
}