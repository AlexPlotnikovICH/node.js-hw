import express from 'express'
import bcrypt from 'bcryptjs'
import { getDB } from '../db/index.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    //  Валидация
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

    //  Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10)

    // Сохранение в базу
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

export default router
