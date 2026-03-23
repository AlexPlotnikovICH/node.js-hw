import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
  res.send('Posts: Список постов (заглушка)')
})

// POST /posts
router.post('/', (req, res) => {
  res.send('Posts: Создание поста (заглушка)')
})

export default router
