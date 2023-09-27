import type { Response } from 'express'

export type BaseResponse<T = any> = Response<{
  message: string
  code?: number
  data?: T
}>

export interface PageResponse<T = any> {
  data?: T
  pageCount: number
  pageSize: number
  total: number
}
