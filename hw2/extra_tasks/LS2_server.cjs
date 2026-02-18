//Новый  HTTP Сервер
const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  const url = req.url

  if (url === '/') {
    res.end('Привет!')
  } else if (url === '/about') {
    res.end('Это страница о нас.')
  } else {
    res.statusCode = 404
    res.end('Страница не найдена.')
  }
})

server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000')
})
