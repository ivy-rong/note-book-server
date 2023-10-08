import express from 'express'
import type { Request } from 'express'

import { Note } from '@prisma/client'
import { NotesService } from '@/services'
import { BaseResponse } from '@/types'
import { NoteResponse } from '@/models'

const router = express.Router()

//获取当前用户所有笔记
router.get('/notes', async (req: Request, res: BaseResponse<NoteResponse>) => {
  const { id } = req.currentUser
  const { pageCount = 1, pageSize = 10 } = req.query || {}
  const pageCountType = Number(pageCount)
  const pageSizeType = Number(pageSize)
  console.log(id, pageSizeType, pageCountType)
  try {
    const notes = await NotesService.getNotes(id, pageSizeType, pageCountType)
    console.log(notes)
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
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message
    })
    return
  }
})

//获取当前用户一个笔记
router.get('/note/:noteId', async (req: Request, res: BaseResponse<Note>) => {
  const { noteId } = req.params || {}
  const { id } = req.currentUser
  try {
    const note = await NotesService.getNote(id, Number(noteId))
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
})

//添加当前用户当前笔记
router.post('/note', async (req: Request<Note>, res: BaseResponse<Note>) => {
  const { id } = req.currentUser
  const requestNote = req.body || {}
  try {
    const note = await NotesService.addNote({ ...requestNote, authorId: id })
    res.status(200).json({
      message: '添加笔记成功',
      data: note
    })
    return
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message
    })
    return
  }
})

//删除当前用户当前笔记
router.delete('/note/:id', async (req: Request, res: BaseResponse<Note>) => {
  const { id } = req.params
  try {
    const note = await NotesService.deleteNote(Number(id))
    console.log(note)
    res.status(200).json({
      message: '删除笔记成功',
      data: note
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
  path: '',
  router
}
