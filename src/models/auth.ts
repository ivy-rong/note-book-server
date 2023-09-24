import { User } from '@prisma/client'

export interface LoginInputModel {
  username: string
  password: string
  id: number
  createdAt?: Date | null
  createdBy?: number | null
  updatedAt?: Date | null
  updatedBy?: number | null
  deletedAt?: Date | null
  deletedBy?: number | null
}

export interface SignupInputModel extends LoginInputModel {
  confirmPassword: string
}

export interface AuthResponse {
  accessToken: string
  user: User
}
