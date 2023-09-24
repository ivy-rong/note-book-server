import type { Response } from 'express'

export type BaseResponse<T = any> = Response<{
  message: string
  code?: number
  data?: T
}>
