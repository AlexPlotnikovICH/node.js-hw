import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('public'))

io.on('connection', socket => {
  console.log('Юзер подключился, ID:', socket.id)

  socket.on('chat message', msg => {
    console.log('Сервер получил сообщение:', msg)

    socket.emit('message confirmation', 'Сообщение доставлено: ' + msg)
  })

  socket.on('disconnect', () => {
    console.log('Юзер отвалился, ID:', socket.id)
  })
})

server.listen(3000, () => {
  console.log('Сервер на 3000 порту')
})
