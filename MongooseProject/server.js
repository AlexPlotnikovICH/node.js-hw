import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
const app = express()

const dbURI = process.env.MONGODB_URI
const port = process.env.PORT || 3333
const host = process.env.HOST || '127.0.0.1'

app.use(express.json())

console.log('🔌 Пробуем подключиться к:', dbURI)

mongoose
  .connect(dbURI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!')

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://${host}:${port}`)
    })
  })
  .catch(error => {
    console.error('❌ Failed to connect to MongoDB:', error.message)
    process.exit(1)
  })
