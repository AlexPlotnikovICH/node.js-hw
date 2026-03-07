import { Sequelize } from 'sequelize'
// импорт JSON
import configData from './config.json' with { type: 'json' }

const config = configData.development

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
  },
)

try {
  await sequelize.authenticate()
  console.log('---------------- Связь с базой есть.')
} catch (error) {
  console.error('------------- Ошибка БД:', error.message)
}

export default sequelize
