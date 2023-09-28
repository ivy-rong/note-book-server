import { prisma } from '../prisma'
import { Note } from '@prisma/client'

class NotesService {
  async getNotes(userId: number, pageSize = 10, pageCount = 1) {
    return await prisma.note.findMany({
      where: {
        authorId: userId
      },
      skip: (pageCount - 1) * pageSize,
      take: pageSize,
      include: {
        contents: true
      }
    })
  }
  //得到一个用户的一个笔记
  async getNote(userId: number, noteId: number) {
    return await prisma.note.findUniqueOrThrow({
      where: {
        id: noteId,
        authorId: userId
      },
      include: {
        contents: true
      }
    })
  }

  //修改一个笔记
  async updateNote(id: number, data: Note) {
    return await prisma.note.update({
      where: {
        id
      },
      data
    })
  }

  //删除一个笔记
  async deleteNote(noteId: number) {
    return await prisma.note.delete({
      where: {
        id: noteId
      }
    })
  }

  //增加一个笔记
  async addNote(note: Note) {
    return await prisma.note.create({
      data: {
        ...note
      },
      include: {
        contents: true
      }
    })
  }
}

export default new NotesService()
