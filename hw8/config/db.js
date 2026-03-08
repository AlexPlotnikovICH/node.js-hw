import { Sequelize } from 'sequelize'
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

export default sequelize
