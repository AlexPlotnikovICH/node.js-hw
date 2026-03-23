import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDB } from '../db/index.js'

const router = express.Router()

// --- РЕГИСТРАЦИЯ
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    //Валидация
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' })
    }

    const db = getDB()
    const usersCollection = db.collection('users')

    // Проверка на дубликаты
    const existingUser = await usersCollection.findOne({ username })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    //  Хеширование
    const hashedPassword = await bcrypt.hash(password, 10)

    //  Сохранение
    const newUser = {
      username,
      password: hashedPassword,
      createdAt: new Date(),
    }

    await usersCollection.insertOne(newUser)
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// --- ЛОГИН  ---
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // валидация
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' })
    }

    const db = getDB()
    const user = await db.collection('users').findOne({ username })

    // Проверка: есть ли юзер И совпадает ли пароль
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Создание JWT "пропуска" на 1 час
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )

    res.json({ message: 'Login successful', token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
