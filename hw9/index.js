import express from 'express'
import dotenv from 'dotenv'
import sequelize from './db.js'
import User from './User.js'
import bcrypt from 'bcrypt'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3333

app.post('/register', async (req, res) => {
  const { email, password, role } = req.body // Добавили role, чтобы ты мог создать админа для теста
  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) return res.status(400).json({ error: 'Email занят' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || 'user',
    })
    res.status(201).json({ message: 'ОК', userId: newUser.id })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Неверные данные' })
    }
    res.json({
      userId: user.id,
      role: user.role,
      mustChangePassword: user.mustChangePassword,
    })
  } catch (e) {
    res.status(500).json({ error: 'Ошибка входа' })
  }
})

// Маршрут смены пароля
app.post('/change-password', async (req, res) => {
  const { userId, newPassword } = req.body
  try {
    const user = await User.findByPk(userId)
    if (!user) return res.status(404).json({ error: 'Нет такого' })
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await user.update({ password: hashedPassword, mustChangePassword: false })
    res.json({ message: 'Пароль обновлен' })
  } catch (e) {
    res.status(500).json({ error: 'Ошибка' })
  }
})

// Смена пароля
const checkPasswordChange = async (req, res, next) => {
  const { userId } = req.body
  if (!userId) return next()
  const user = await User.findByPk(userId)
  if (user?.mustChangePassword)
    return res
      .status(403)
      .json({ error: 'Смени пароль!', redirect: '/change-password' })
  next()
}

// Проверка роли
const checkRole = role => {
  return async (req, res, next) => {
    const { userId } = req.body
    const user = await User.findByPk(userId)
    if (user?.role !== role)
      return res.status(403).json({ error: 'Ты не админ, уходи' })
    next()
  }
}

app.use(checkPasswordChange)

// Админка
app.get('/admin', (req, res) => {
  res.json({ message: 'Секретная зона админа' })
})
app.post('/admin-action', checkRole('admin'), (req, res) => {
  res.json({ message: 'Админское действие выполнено' })
})

//Удаление аккаунта
app.post('/delete-account', async (req, res) => {
  const { userId, password } = req.body
  try {
    const user = await User.findByPk(userId)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Пароль не тот' })
    }
    await user.destroy()
    res.json({ message: 'Аккаунт удален. Помянем.' })
  } catch (e) {
    res.status(500).json({ error: 'Ошибка удаления' })
  }
})

// Изменение Email
app.post('/change-email', async (req, res) => {
  const { userId, newEmail, password } = req.body
  try {
    const user = await User.findByPk(userId)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Пароль неверный' })
    }
    // Проверка уникальности нового email
    const emailExists = await User.findOne({ where: { email: newEmail } })
    if (emailExists)
      return res.status(400).json({ error: 'Этот email уже занят' })

    await user.update({ email: newEmail })
    res.json({ message: 'Email успешно изменен' })
  } catch (e) {
    res.status(500).json({ error: 'Ошибка' })
  }
})

async function startApp() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    app.listen(PORT, () => console.log(`Сервер на ${PORT}`))
  } catch (e) {
    console.error(e)
  }
}
startApp()
