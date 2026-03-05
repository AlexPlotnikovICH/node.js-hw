import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3333
app.get('/', (req, res) => {
  res.send('Hello, Sequelize with Express!')
})
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
