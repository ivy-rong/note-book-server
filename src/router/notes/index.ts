import express from 'express'

import { Note } from '@prisma/client'
import { NotesService } from '@/services'
import { BaseResponse } from '@/types'
import { JWTManager } from '@/core'

const router = express.Router()

//获取当前用户所有笔记
router.get('/:userId/notes', async (req, res: BaseResponse<any>) => {
  const { pageCount, pageSize } = req.query || {}
  const { userId } = req.params || {}
  const { authorization } = req.headers || {}
  console.log(req.headers)
  const accessToken = JWTManager.verificationToken(authorization!)
  console.log(accessToken)
  // try {
  //   const notes = NotesService.getNotes(userId, pageSize, pageCount)
  // } catch (e) {
  //   res.status(400).json({
  //     message: (e as Error).message
  //   })
  //   return
  // }

  res.status(400).json({
    message: '获取笔记数据成功',
    data: {
      pageCount,
      pageSize,
      userId,
      authorization
    }
  })
  return
})

//获取当前用户所有笔记当前笔记
router.get('/:userId/note/:noteId', async (req, res) => {})

//添加当前用户当前笔记
router.get('/:userId/note/:noteId', async (req, res) => {})

export default {
  path: '',
  router
}
