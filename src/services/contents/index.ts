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

  //修改一个笔记所有内容
  async updateContents(noteId: number, data: Content[]) {
    const updatePromises = data.map((content) => {
      return prisma.content.updateMany({
        where: {
          id: content.id,
          noteId
        },
        data: content
      })
    })
    return Promise.all(updatePromises)
  }

  //删除一个笔记的一条内容
  async deleteContent(id: number) {
    return await prisma.content.delete({
      where: {
        id
      }
    })
  }

  //增加一个笔记内容
  async addContent(data: Content, noteId: number) {
    return await prisma.content.create({
      data: {
        ...data,
        noteId
      }
    })
  }
}

export default new ContentsService()
