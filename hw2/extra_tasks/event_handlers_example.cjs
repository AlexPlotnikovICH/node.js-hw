const EventEmitter = require('events')

const emitter = new EventEmitter()
const handler1 = () => {
  console.log('отработал 1 слушатель ')
}

const handler2 = () => {
  console.log('2 слушатель отработал')
}
emitter.on('start', handler1)
emitter.on('start', handler2)

emitter.removeListener('start', handler1)

emitter.emit('start')
