// №6: Управление состоянием пользователя3
const EventEmitter = require('events')

const userState = new EventEmitter()

function changeUserState(status, emitter) {
  emitter.emit('stateChange', status)
}
userState.on('stateChange', newStatus => {
  console.log('статус пользователя изменился на:', newStatus)
})

changeUserState('online', userState)
changeUserState('away', userState)
changeUserState('offline', userState)
