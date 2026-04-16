import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { authenticateToken, authorizeRole } from './middlewares/auth.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3333
const JWT_SECRET = process.env.JWT_SECRET

// бд 1, 2, 3
let users = [
  {
    id: 1,
    username: 'mentor',
    email: 'mentor@example.com',
    password: '$2b$10$AKh4SiPEkABqVSHPte.FGOU0gupwzevzUOO3Fwv9.7qmNuQwuqBbm', // пароль 123456
    role: 'admin',
  },
  {
    id: 2,
    username: 'student',
    email: 'student@example.com',
    password: '$2b$10$AKh4SiPEkABqVSHPte.FGOU0gupwzevzUOO3Fwv9.7qmNuQwuqBbm',
    role: 'user',
  },
]

app.get('/', (req, res) => res.send('Lesson 10: JWT and Middlewares'))

// Логин
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Неверные данные' })
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  })
  res.json({ token })
})

// Обновление email
app.patch('/update-email', authenticateToken, (req, res) => {
  const { newEmail } = req.body
  if (!newEmail) return res.status(400).json({ message: 'Нужен newEmail' })

  const user = users.find(u => u.id === req.user.id)
  if (!user) return res.status(404).json({ message: 'Юзер потерялся' })

  user.email = newEmail
  res.json({
    message: 'Email обновлен',
    user: { id: user.id, email: user.email },
  })
})

// Удаление аккаунта
app.delete('/delete-account', authenticateToken, (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.user.id)
  if (userIndex === -1)
    return res.status(404).json({ message: 'Юзер не найден' })

  users.splice(userIndex, 1)
  res.json({ message: 'Аккаунт удален' })
})

// Обновление роли
app.patch(
  '/update-role',
  authenticateToken,
  authorizeRole('admin'),
  (req, res) => {
    const { userId, newRole } = req.body
    if (!userId || !newRole)
      return res.status(400).json({ message: 'Нужны userId и newRole' })

    const user = users.find(u => u.id === Number(userId))
    if (!user)
      return res.status(404).json({ message: 'Пользователь не найден' })

    user.role = newRole
    res.json({ message: `Роль юзера ${user.username} теперь ${newRole}` })
  },
)

// Refresh token
app.post('/refresh-token', authenticateToken, (req, res) => {
  const newToken = jwt.sign(
    { id: req.user.id, role: req.user.role },
    JWT_SECRET,
    { expiresIn: '1h' },
  )
  res.json({ message: 'Токен обновлен', token: newToken })
})
app.listen(PORT, () => console.log(`Server on port ${PORT}`))
