/* Одноразовые события (once) и запись лога*/
const EventEmitter = require('events')

const fs = require('fs')

const path = require('path')

const notifier = new EventEmitter()
const logPath = path.join(__dirname, 'notifications.txt')

function sendNotification(message, emitter) {
  emitter.emit('notification', message)
}

notifier.on('notification', message => {
  console.log(`сообщение в консолю - ${message}`)
})

notifier.on('notification', message => {
  const dataToWrite = message + '\n'
  fs.appendFile(logPath, dataToWrite, err => {
    if (err) {
      console.error('Ошибка при записи в файл:', err)
    } else {
      console.log('Данные успешно записаны в файл логов')
    }
  })
})
sendNotification('первое уведомление.', notifier)
sendNotification('второе, оно в файле.', notifier)
