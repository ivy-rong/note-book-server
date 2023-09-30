import { Content } from '@prisma/client'

export interface ContentModel {
  id: number
  content: string
  noteId: number
  createdAt?: Date | null
  createdBy?: number | null
  updatedAt?: Date | null
  updatedBy?: number | null
  deletedAt?: Date | null
  deletedBy?: number | null
}
