import { Express } from 'express'
import { RouterItem } from '@/types'

export const registerRouter = (app: Express, routers: RouterItem[]) => {
  routers.forEach((router) => {
    app.use(router.path, router.router)
  })
}
