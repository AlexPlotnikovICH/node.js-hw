import express from 'express'
import { Publisher } from './models/Publisher.js'
import { Magazine } from './models/Magazine.js'
import { Tag } from './models/Tag.js'
import { Article } from './models/Article.js'
import { connectDB } from './db/index.js'

const app = express()
const PORT = process.env.PORT || 3002

app.use(express.json())

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Express сервер запущен на http://localhost:${PORT}`)
  })
})
