import express from 'express'
import type { Request } from 'express'

import { Note } from '@prisma/client'
import { NotesService } from '@/services'
import { BaseResponse } from '@/types'
import { JWTManager } from '@/core'
import { NoteResponse, NoteRequest } from '@/models'

const router = express.Router()

//获取当前用户所有笔记
router.get(
  '/:userId/notes',
  async (req: Request, res: BaseResponse<NoteResponse>) => {
    const { pageCount, pageSize } = req.query || {}
    const { userId } = req.params || {}
    const { authorization } = req.headers || {}
    const pageCountType = Number(pageCount)
    const pageSizeType = Number(pageSize)
    const userIdType = Number(userId)
    //验证token
    if (!authorization || !JWTManager.verificationToken(authorization!)) {
      res.status(401).json({
        message: 'token验证失败请重新登录'
      })
      return
    }
    let notes: Note[]
    try {
      notes = await NotesService.getNotes(
        userIdType,
        pageSizeType,
        pageCountType
      )
      console.log(notes)
    } catch (e) {
      notes = []
      res.status(400).json({
        message: (e as Error).message
      })
      return
    }

    res.status(200).json({
      message: '获取笔记数据成功',
      data: {
        pageCount: pageCountType,
        pageSize: pageSizeType,
        total: notes.length,
        notes: notes
      }
    })
    return
  }
)

//获取当前用户一个笔记
router.get(
  '/:userId/note/:noteId',
  async (req: Request, res: BaseResponse<Note>) => {
    const { userId, noteId } = req.params || {}
    try {
      const note = await NotesService.getNote(Number(userId), Number(noteId))
      console.log(note)
      res.status(200).json({
        message: '获取笔记成功',
        data: note
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

//添加当前用户当前笔记
router.post('/:userId/note', async (req, res) => {})

export default {
  path: '',
  router
}
