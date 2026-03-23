import 'dotenv/config'
import express from 'express'
import { connectDB } from './db/index.js'

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  })
  .catch(error => {
    console.error('Server failed to start:', error)
  })
