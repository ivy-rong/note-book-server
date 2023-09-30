import { default as AuthRouter } from './auth'
import { default as NotesRouter } from './notes'
import { default as ContentsRouter } from './contents'
import { RouterItem } from '@/types'

export const routers: RouterItem[] = [AuthRouter, NotesRouter, ContentsRouter]
