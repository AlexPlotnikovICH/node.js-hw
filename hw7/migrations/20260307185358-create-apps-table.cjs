'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Метод UP (создаем таблицу)
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Apps', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })
  },

  // Метод DOWN - откатываем изменения (удаляем таблицу)
  // типа Ctrl+Z для БД
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Apps')
  },
}
