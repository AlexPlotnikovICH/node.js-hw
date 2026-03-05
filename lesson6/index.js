import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 3333
const app = express()

// Middleware to parse JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Middleware to parse URL-encoded bodies

app.get('/users/:id', (req, res, next) => {
  const userId = req.params.id
  if (!userId) {
    const error = new Error('User not found. User ID is required.')
    error.status = 404
    return next(error)
  }
  res.send(`User ID: ${userId}`)
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).json({ messsage: err.messsage })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
