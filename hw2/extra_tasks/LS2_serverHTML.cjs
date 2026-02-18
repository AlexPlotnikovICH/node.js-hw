//Отправка HTML-содержимого
const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  const url = req.url
  if (url === '/') {
    res.end(`
      <h1 style="color: darkblue;">Главная страница</h1>
      <p>Добро пожаловать в наш Node.js сервер!</p>
      <a href="/about">Узнать больше о нас</a>
    `)
  } else if (url === '/about') {
    res.end(`
      <h1 style="color: darkgreen;">О нас</h1>
      <p>Мы изучаем бэкенд на реальных примерах.</p>
      <a href="/">Вернуться на главную</a>
    `)
  } else {
    res.statusCode = 404
    res.end(`
      <h1 style="color: red;">Ошибка 404</h1>
      <p>Похоже, такого адреса не существует.</p>
      <a href="/">На главную</a>
    `)
  }
})

server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000')
})
