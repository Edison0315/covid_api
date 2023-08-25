const { EventEmitter } = require('events')

class PubSub extends EventEmitter {
  constructor(){
    super({captureRejections: true})
    this.topics = new Map()
  }

  // Emitter
  async publish(topic, payload){
    this.emit(topic, payload)
  }

  // Listener
  subscribe(topic, handler){
    if(this.topics.has(topic)){
      this.unsubscribe(topic)
    }

    this.on(topic, handler)
    this.topics.set(topic, handler)
  }


  // Remove listener
  unsubscribe(topic){
    if(this.topics.has(topic)){
      const handler = this.topics.get(topic)
      this.removeListener(topic, handler)
      this.topics.delete(topic)
    } else {
      this.emit('error', new Error(`An error was ocurred`))
    }
  }
}

module.exports = PubSub