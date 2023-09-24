import express from 'express'
import bodyParser from 'body-parser'
import { BaseRegister } from '@/base'
import { routers } from '@/router'
import morgan from 'morgan'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))
// 日志
app.use(morgan('dev'))
// 静态目录
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.status(200).send('Hello')
})

// 注入路由
BaseRegister.registerRouter(app, routers)

export default app
