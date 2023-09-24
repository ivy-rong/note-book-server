import { Router } from 'express'

export interface RouterItem {
  path: string
  router: Router
}
