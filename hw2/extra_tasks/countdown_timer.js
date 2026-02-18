import { EventEmitter } from 'events'

const timeEmitter = new EventEmitter()

function countdown(seconds, emitter) {
  let remainingTime = seconds

  const intervalId = setInterval(() => {
    emitter.emit('tick', remainingTime)
    remainingTime--

    if (remainingTime < 0) {
      clearInterval(intervalId)
      emitter.emit('end')
    }
  }, 1000)
}

timeEmitter.on('tick', timeLeft => {
  console.log(`Осталось: ${timeLeft} сек.`)
})

timeEmitter.on('end', () => {
  console.log('======== ПОТРАЧЕНО! ========')
})

countdown(10, timeEmitter)
