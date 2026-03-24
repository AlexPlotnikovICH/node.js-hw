import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getDB } from '../db/index.js'

const router = express.Router()

// GET /posts — Получение всех сообщений
router.get('/', async (req, res) => {
  try {
    const db = getDB()

    const posts = await db.collection('posts').find({}).toArray()

    res.status(200).json(posts)
  } catch (error) {
    console.error('Ошибка при получении списка постов:', error)
    res.status(500).json({ message: 'Error fetching posts' })
  }
})

// СОЗДАНИЕ ПОСТА (Только с токеном)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' })
    }

    const db = getDB()
    const newPost = {
      title,
      content,
      author: req.user.username,
      authorId: req.user.userId,
      createdAt: new Date(),
    }

    await db.collection('posts').insertOne(newPost)
    res.status(201).json({ message: 'Post created', post: newPost })
  } catch (error) {
    console.error('Create post error:', error.message)
    res
      .status(500)
      .json({ message: 'Error creating post', details: error.message })
  }
})

export default router
