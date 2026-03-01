import http from 'http'

const PORT = 3333

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (req.method === 'PUT') {
    res.statusCode = 200
    res.end('PUT-запрос обработан')
  } else if (req.method === 'DELETE') {
    res.statusCode = 200
    res.end('DELETE-запрос обработан')
  } else {
    res.end('Жду PUT или DELETE')
  }
})
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`)
})
