import { prisma } from '../prisma'
import { Content } from '@prisma/client'

class ContentsService {
  //得到所有内容
  async getContents(noteId: number) {
    return await prisma.content.findMany({
      where: {
        noteId
      }
    })
  }

  //修改一个笔记内容
  async updateNote(id: number, data: Content) {
    return await prisma.content.update({
      where: {
        id
      },
      data
    })
  }

  //删除一个笔记内容
  async deleteNote(id: number) {
    return await prisma.content.delete({
      where: {
        id
      }
    })
  }

  //增加一个笔记内容
  async addNote(data: Content) {
    return await prisma.content.create({
      data: {
        ...data
      }
    })
  }
}

export default new ContentsService()
