import express from 'express'
import pool from './db.js'

const app = express()
const port = 3333

// (Middleware
// Без этой строки req.body всегда будет пустой дырой
app.use(express.json())

app.get('/', (req, res) => {
  try {
    res.json({ message: 'Hello World!, SERVER RABOTAET!!' })
  } catch (err) {
    res.status(500).json({ error: 'Ошибка на главной' })
  }
})

app.post('/', (req, res) => {
  try {
    const data = req.body
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ error: 'Oshibka! Net dannyh v tele zaprosa!' })
    }
    res.json({ message: 'Dannye uspeshno polucheny!', receivedData: data })
  } catch (err) {
    res.status(500).json({ error: 'Chto-to poshlo ne tak' })
  }
})

app.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products')
    res.json(rows)
  } catch (err) {
    console.error('Ошибка БД:', err.message)
    res.status(500).json({ error: 'Ошибка при получении товаров со склада' })
  }
})

// Добавление нового товара
app.post('/products', async (req, res) => {
  try {
    const { name, price } = req.body

    if (!name || !price) {
      return res.status(400).json({ error: 'Имя и цена обязательны, не тупи' })
    }

    const query = 'INSERT INTO products (name, price) VALUES (?, ?)'
    await pool.query(query, [name, price])

    res.status(201).json({ message: 'Товар успешно добавлен на склад!' })
  } catch (err) {
    console.error('Ошибка БД:', err.message)
    res.status(500).json({ error: 'Склад отказался принимать этот товар' })
  }
})

app.listen(port, () => {
  console.log(`🚀 Сервер взлетел и слушает порт ${port}`)
})
