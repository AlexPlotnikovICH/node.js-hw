import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const App = sequelize.define(
  'App',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Поле обязательно для заполнения
    },
    size: {
      type: DataTypes.INTEGER, //  вес в мб
      allowNull: false,
    },
  },
  {
    tableName: 'Apps', // Жестко фиксируем имя таблицы в БД
    timestamps: false, // Отрубаем автоматические поля createdAt и updatedAt
  },
)

export default App
