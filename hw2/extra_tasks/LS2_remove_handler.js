import { EventEmitter } from 'events'

const myEmitter = new EventEmitter()

function onMessege(text) {
  console.log(`Получено сообщение: ${text}`)
}
myEmitter.on('event', onMessege)

console.log('первый вызов')

myEmitter.emit('event', 'тест тест тест')

myEmitter.removeListener('event', onMessege)

console.log('второй вызов')
myEmitter.emit('event')
