import express from 'express'
import Book from './models/book.js'
import sequelize from './config/db.js'

const app = express()
const PORT = 3333

app.use(express.json())

// 1. GET - Получить всё
app.get('/books', async (req, res) => {
  try {
    const data = await Book.findAll()
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
// Заглушка
app.get('/', (req, res) => {
  res.send('Сервер работает. Список книг ищи по адресу /books')
})
// 2. POST - Создать
app.post('/books', async (req, res) => {
  try {
    const newBook = await Book.create(req.body)
    res.status(201).json(newBook)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Ошибка при создании', error: error.message })
  }
})

// 3. PUT - Обновить (уже с ID)
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [updated] = await Book.update(req.body, { where: { id } })

    if (updated) {
      const updatedBook = await Book.findByPk(id)
      return res.json(updatedBook)
    }
    res.status(404).json({ message: 'Книга не найдена' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Ошибка при обновлении', error: error.message })
  }
})
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params

    // Удаляем запись
    const deleted = await Book.destroy({
      where: { id: id },
    })

    if (deleted) {
      return res.json({ message: 'Книга успешно удалена' })
    }

    res.status(404).json({ message: 'Книга не найдена' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Ошибка при удалении', error: error.message })
  }
})
// ФУНКЦИЯ ЗАПУСКА ВСЕГДА В КОНЦЕ
async function startServer() {
  try {
    await sequelize.authenticate()
    console.log('--- Связь с базой в Docker OK ---')
    app.listen(PORT, () => {
      console.log(`--- Сервер: http://localhost:${PORT} ---`)
    })
  } catch (error) {
    console.error('Ошибка БД:', error)
  }
}

startServer()
