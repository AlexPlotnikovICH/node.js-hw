const EventEmitter = require('events')
const chatEmitter = new EventEmitter()

function sendMessage(username, message, emitter) {
  emitter.emit('message', { username, message })
}

chatEmitter.on('message', data => {
  console.log(`${data.username}: ${data.message}`)
})

sendMessage('Alex', 'Всем привет!', chatEmitter)
sendMessage('Anna', 'Привет, Алекс! Как код?', chatEmitter)
sendMessage('Misha', 'Домашку все сделали?', chatEmitter)
