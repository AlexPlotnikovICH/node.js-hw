import express from 'express'
const router = express.Router()

// POST /auth/register
router.post('/register', (req, res) => {
  res.send('Auth: Регистрация работает (заглушка)')
})

// POST /auth/login
router.post('/login', (req, res) => {
  res.send('Auth: Логин работает (заглушка)')
})

export default router
