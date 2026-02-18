import { EventEmitter } from 'events'

const myEmitter = new EventEmitter()

myEmitter.on('event', () => {
  console.log('первый обработчик события')
})

myEmitter.on('event', () => {
  console.log('второй обработчик события')
})

myEmitter.emit('event')
