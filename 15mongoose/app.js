import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import productRouter from './routes/product.js'

const app = express()
const PORT = process.env.PORT || 3333
const MONGO_URI = process.env.MONGO_URI

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully')
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('❌ Connection error:', err.message)
    process.exit(1)
  })

app.use(express.json())

app.use('/products', productRouter)
