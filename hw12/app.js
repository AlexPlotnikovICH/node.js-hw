import express from 'express'
import { connectDB } from './db/index.js'
import { ObjectId } from 'mongodb'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

async function startServer() {
  try {
    const db = await connectDB()

    app.locals.db = db

    // POST
    app.post('/products', async (req, res) => {
      try {
        const { name, price, description } = req.body

        if (!name || !price || !description) {
          return res
            .status(400)
            .json({ error: 'Все поля (name, price, description) обязательны' })
        }

        const collection = db.collection('products')

        const newProduct = { name, price, description }
        const result = await collection.insertOne(newProduct)

        res.status(201).json({ _id: result.insertedId, ...newProduct })
      } catch (error) {
        console.error('Ошибка при создании продукта:', error)
        res
          .status(500)
          .json({ error: 'Внутренняя ошибка сервера при создании продукта' })
      }
    })

    // GET
    app.get('/products', async (req, res) => {
      try {
        const collection = db.collection('products')
        const products = await collection.find({}).toArray()

        res.status(200).json(products)
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error)
        res
          .status(500)
          .json({ error: 'Внутренняя ошибка сервера при получении списка' })
      }
    })
    app.get('/products/:id', async (req, res) => {
      try {
        const { id } = req.params

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Некорректный формат ID' })
        }

        const collection = db.collection('products')
        const product = await collection.findOne({ _id: new ObjectId(id) })

        if (!product) {
          return res.status(404).json({ error: 'Продукт не найден' })
        }

        res.status(200).json(product)
      } catch (error) {
        console.error('Ошибка при поиске по ID:', error)
        res.status(500).json({ error: 'Внутренняя ошибка сервера' })
      }
    })
    //PUT
    app.put('/products/:id', async (req, res) => {
      try {
        const { id } = req.params
        const { name, price, description } = req.body

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Некорректный формат ID' })
        }

        const collection = db.collection('products')

        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { name, price, description } },
        )

        if (result.matchedCount === 0) {
          return res
            .status(404)
            .json({ error: 'Продукт для обновления не найден' })
        }

        res.status(200).json({ message: 'Обновление успешно завершено' })
      } catch (error) {
        console.error('Ошибка при обновлении:', error)
        res.status(500).json({ error: 'Внутренняя ошибка сервера' })
      }
    })
    // DELETE
    app.delete('/products/:id', async (req, res) => {
      try {
        const { id } = req.params

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Некорректный формат ID' })
        }

        const collection = db.collection('products')

        const result = await collection.deleteOne({ _id: new ObjectId(id) })

        if (result.deletedCount === 0) {
          return res.status(404).json({
            error: 'Продукт для удаления не найден (возможно, уже удален)',
          })
        }

        res.status(200).json({ message: 'Продукт успешно уничтожен' })
      } catch (error) {
        console.error('Ошибка при удалении:', error)
        res.status(500).json({ error: 'Внутренняя ошибка сервера' })
      }
    })
    app.listen(PORT, () => {
      console.log(`Express сервер запущен на http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Не смогли поднять сервер:', error)
    process.exit(1)
  }
}

startServer()
