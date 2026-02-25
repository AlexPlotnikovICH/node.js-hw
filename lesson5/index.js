import 'dotenv/config'
import http from 'http'
import fs from 'fs'

const PORT = process.env.PORT || 3333

const server = http.createServer((req, res) => {
  const logMessage = `${new Date().toISOString()} | Method: ${req.method} | URL: ${req.url}\n`

  fs.appendFile('requests.log', logMessage, err => {
    if (err) {
      console.error('Ошибка записи в файл:', err)
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      return res.end('Ошибка сервера при логировании')
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('Запрос успешно залогирован в файл')
  })
})
server.listen(PORT, () => {
  console.log(`Сервер запущен и слушает порт ${PORT}`)
})
