import { Note } from '@prisma/client'

export interface NoteModel {
  id: number
  published: boolean
  authorId: number
  createdAt?: Date | null
  createdBy?: number | null
  updatedAt?: Date | null
  updatedBy?: number | null
  deletedAt?: Date | null
  deletedBy?: number | null
}

export interface NoteResponse {
  pageCount: number
  pageSize: number
  total: number
  notes: Note[]
}

export interface NoteRequest {
  pageCount: number
  pageSize: number
  userId: number
}
