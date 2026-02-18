import { EventEmitter } from 'events'

const myEmitter = new EventEmitter()

function handler1() {
  console.log('первый обработчик')
}

function handler2() {
  console.log('второй обработчик')
}

myEmitter.on('event', handler1)
myEmitter.on('event', handler2)

console.log('до удаления первого обработчика')
myEmitter.emit('event')

myEmitter.removeListener('event', handler1)

console.log('после удаления первого обработчика')
myEmitter.emit('event')
