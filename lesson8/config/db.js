import { Sequelize } from 'sequelize'
import configData from './config.js' // Импортируем наш конфиг с паролями

const env = process.env.NODE_ENV || 'development'
const config = configData[env]

// Создаем экземпляр подключения
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
  },
)

export default sequelize
