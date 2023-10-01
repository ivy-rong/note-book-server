import express from 'express'
import type { Request } from 'express'

import { Content } from '@prisma/client'
import { ContentsService } from '@/services'
import { BaseResponse } from '@/types'

const router = express.Router()

//根据笔记ID 获取当前所有内容
router.get(
  '/contents/:noteId',
  async (req: Request, res: BaseResponse<Content[]>) => {
    const { noteId } = req.params
    console.log(noteId)
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

//修改一个笔记内容
// router.patch('/note/:id', async (req: Request, res: BaseResponse<Note>) => {
//   const { id } = req.params || {}
//   const { data } = req.body
//   try {
//     const note = await ContentsService.updateContents(Number(id), data)
//     res.status(200).json({
//       message: '修改笔记成功'
//       // data: note
//     })
//     return
//   } catch (e) {
//     res.status(400).json({
//       message: (e as Error).message
//     })
//     return
//   }
// })

// //添加当前用户当前笔记
// router.post('/note', async (req: Request<Note>, res: BaseResponse<Note>) => {
//   const { id } = req.currentUser
//   const requestNote = req.body || {}
//   try {
//     const note = await ContentsService.addNote({ ...requestNote, authorId: id })
//     res.status(200).json({
//       message: '添加笔记成功'
//     })
//     return
//   } catch (e) {
//     res.status(400).json({
//       message: (e as Error).message
//     })
//     return
//   }
// })

// //删除当前用户当前笔记
// router.delete('/note/:id', async (req: Request, res: BaseResponse<Note>) => {
//   const { id } = req.params
//   try {
//     const note = await ContentsService.deleteNote(Number(id))
//     console.log(note)
//     res.status(200).json({
//       message: '删除笔记成功'
//     })
//     return
//   } catch (e) {
//     res.status(400).json({
//       message: (e as Error).message
//     })
//     return
//   }
// })

export default {
  path: '',
  router
}
