import app from './app'
import http from 'node:http'
import process from 'node:process'
const httpServer = http.createServer(app)

httpServer.listen(3000, () => {
  process.stdout.write('Express 服务端已经运行在 3000 端口！\n')
})
