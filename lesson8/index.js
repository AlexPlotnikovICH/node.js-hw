import 'dotenv/config' // 1. Загружаем переменные окружения ПЕРВЫМИ
import express from 'express'
import sequelize from './config/db.js' // 2. Обязательно добавляем .js

const app = express()
const PORT = process.env.PORT || 3333

app.get('/', (req, res) => {
  res.send('Hello express server')
})

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate()
    // 3. Исправь опечатку: "Connection", а не "Connetion"
    console.log('Connection to the database has been established successfully.')
    console.log(`Server is running on http://localhost:${PORT}`)
  } catch (error) {
    // 4. Используй правильное имя переменной
    console.error('Unable to connect to the database:', error.message)
  }
})
