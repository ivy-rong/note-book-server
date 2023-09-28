import { User } from '@prisma/client'

export interface LoginInputModel {
  username: string
  password: string
}

export interface SignupInputModel extends LoginInputModel {
  confirmPassword: string
}

export interface AuthResponse {
  accessToken: string
  user: Omit<User, 'password'>
}
