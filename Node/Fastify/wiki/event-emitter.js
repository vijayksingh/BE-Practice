class EventEmitter {
  events = {}

  on(event, callback) {
    if(this.events[event]) {
      this.events[event].push(callback)
    } else {
      this.events[event] = [callback]
    }
  }

  emit(event) {
    
  }
}