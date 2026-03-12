import express from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import { authJWT } from './middlewares/auth.js'
import { testConnection } from './db.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3333
const jwtSecret = process.env.JWT_SECRET_KEY || 'your_secret_key'

// token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXNlcjFAZ21haWwuY29tIiwiaWF0IjoxNzczMzQwODAxLCJleHAiOjE3NzMzNDQ0MDF9.thPiis9-nNg2hiZI3d2okznP8nLU1TwkoMpZWrtz1zM'

function logRequest(req, res, next) {
  console.log(`Received ${req.method}  request to ${req.url}`)
  next()
}
app.use(cors())
app.use(express.json())
app.use(logRequest)

const users = [
  {
    id: 1,
    email: 'user1@gmail.com',
    password: await bcrypt.hash('password111', 10),
  },
  {
    id: 2,
    email: 'user2@gmail.com',
    password: await bcrypt.hash('12345', 10),
  },
  {
    id: 3,
    email: 'user3@gmail.com',
    password: await bcrypt.hash('qwerteert453', 10),
  },
]
app.get('/', (req, res) => {
  res.send('Hello, it works!')
  console.log(users)
})

app.get('/profile', authJWT, (req, res) => {
  res.json({
    status: 'success',
    data: req.user,
  })
})
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required!' })
  }
  try {
    const user = users.find(user => user.email === email)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const isPasswordsMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordsMatch) {
      return res
        .status(401)
        .json('Auth failed. Email or password are incorrect')
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: '1h',
      },
    )
    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})

app.put('/update-profile', authJWT, (req, res) => {
  const idFromToken = req.user.userId

  const { email, name } = req.body

  const userIndex = users.findIndex(u => u.id === idFromToken)

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found in memory' })
  }

  users[userIndex] = {
    ...users[userIndex],
    email: email || users[userIndex].email,
    name: name || users[userIndex].name,
  }

  console.log(`профиль пользователя ID ${idFromToken} обновлен в памяти.`)

  res.json({
    status: 'success',
    message: 'Profile updated in array',
    data: users[userIndex],
  })
})
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
  testConnection()
})
