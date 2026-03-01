import http from 'http'

const PORT = 3333

const server = http.createServer((req, res) => {
  const authHeader = req.headers['authorization']

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (!authHeader) {
    res.statusCode = 401
    return res.end('Неавторизованный запрос!!!')
  }
  res.statusCode = 200
  res.end('Заголовок авторизации получен')
})

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`)
})
