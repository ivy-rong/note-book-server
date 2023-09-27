import type { Response } from 'express'

export type BaseResponse<T = any> = Response<{
  message: string
  code?: number
  data?: T
}>

export type PageResponse<T = any> = Response<{
  message: string
  code?: number
  data?: BasePagesResponse<T>
}>

export interface BasePagesResponse<T = any> {
  data?: T
  pageCount: number
  pageSize: number
  total: number
}
