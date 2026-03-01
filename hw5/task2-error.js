import http from 'http'
import fs from 'fs/promises'
const PORT = 3333
const server = http.createServer(async (req, res) => {
  try {
    throw new Error('Специальная ошибка для теста...')
  } catch (err) {
    await fs.appendFile('errors.log', err.message + '\n')
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    res.end('Internal Server Error')
  }
})

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`)
})
