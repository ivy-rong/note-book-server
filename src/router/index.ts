import { default as AuthRouter } from './auth'
import { default as NotesRouter } from './notes'
import { RouterItem } from '@/types'

export const routers: RouterItem[] = [AuthRouter, NotesRouter]
