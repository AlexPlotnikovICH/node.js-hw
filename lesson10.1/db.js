import { Sequelize } from 'sequelize'

// Создаем экземпляр подключения
const sequelize = new Sequelize('fullstack_db', 'user', 'user_password', {
  host: '127.0.0.1',
  port: 3307,
  dialect: 'mysql',
  logging: false, // Чтобы не засорять консоль SQL-запросами (пока что)
})

// Функция для проверки связи (мы вызовем её в server.js)
export const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log(
      '✅ Connection to MySQL (Docker) has been established successfully.',
    )
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message)
  }
}

export default sequelize
