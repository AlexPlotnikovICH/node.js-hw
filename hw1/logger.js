const fs = require('fs')

//что б файл оставался в папке с дз
const path = require('path')

const logMessage = message => {
  //  путь к  log.txt там же с  logger.js
  const filePath = path.join(__dirname, 'log.txt')
  //даты логов что б понять когда что произошло
  const date = new Date().toLocaleString()
  const textToWrite = `${date} ${message}\n`

  // по обязательному месту
  fs.appendFile(filePath, textToWrite, err => {
    if (err) {
      console.log(err)
    } else {
      console.log('Log message added to log.txt')
    }
  })
}

module.exports = { logMessage }
