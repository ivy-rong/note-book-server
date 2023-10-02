import express from 'express'
import type { Request } from 'express'

import { Content } from '@prisma/client'
import { ContentsService } from '@/services'
import { BaseResponse } from '@/types'

const router = express.Router()

//根据笔记ID 获取当前所有内容
router.get(
  '/get/:noteId',
  async (req: Request, res: BaseResponse<Content[]>) => {
    const { noteId } = req.params
    // const { userId } = req.currentUser
    try {
      const contents = await ContentsService.getContents(Number(noteId))
      res.status(200).json({
        message: '获取单个笔记所有内容成功',
        data: contents
      })
      return
    } catch (e) {
      res.status(400).json({
        message: (e as Error).message
      })
      return
    }
  }
)

//修改一个笔记内容所有内容
router.patch('/update/:noteId', async (req: Request, res: BaseResponse) => {
  const { noteId } = req.params || {}
  const { data } = req.body || {}
  console.log(data)
  try {
    const contents = await ContentsService.updateContents(Number(noteId), data)
    res.status(200).json({
      message: '修改笔记成功',
      data: contents
    })
    return
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message
    })
    return
  }
})

//添加当前用户当前笔记中的一条记录
router.post('/add/:noteId', async (req: Request, res: BaseResponse) => {
  const { data } = req.body || {}
  const { noteId } = req.params || {}
  try {
    const content = await ContentsService.addContent(data, Number(noteId))
    res.status(200).json({
      message: '添加笔记成功',
      data: content
    })
    return
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message
    })
    return
  }
})

//删除当前用户当前笔记的一条内容
router.delete('/delete/:id', async (req: Request, res: BaseResponse) => {
  const { id } = req.params || {}
  console.log(id)
  try {
    const note = await ContentsService.deleteContent(Number(id))
    console.log(note)
    res.status(200).json({
      message: '删除笔记成功'
    })
    return
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message
    })
    return
  }
})

export default {
  path: '/content',
  router
}
