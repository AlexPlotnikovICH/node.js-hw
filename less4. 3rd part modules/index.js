const dotenv = require('dotenv')
dotenv.config()

const http = require('http')

const port = process.env.PORT || 3333

const srver = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

srver.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})