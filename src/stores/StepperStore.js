import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
// import {  browserHistory } from 'react-router'

let _step = 1

class StepperStore extends EventEmitter {
  constructor(){
    super()

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'STEP_TAKEN':
          console.log('_step ready in Store: ', _step);
          _step = action.payload
          console.log('_step set in Store: ', _step);
          this.emit('CHANGE')
          break
      }
    })
  }

  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.removeListener('CHANGE', cb)
  }

  getStep(){
    return _step
  }
}

export default new StepperStore;
