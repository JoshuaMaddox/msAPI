import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _imageText = ''
let _translation = []

class ImageStore extends EventEmitter {
  constructor(){
    super()

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'IMAGE_TEXT_RECEIVED':
          _imageText = action.payload.imageText
          this.emit('CHANGE')
          break
        case 'TRANSLATION_RECEIVED':
          _imageText = action.payload.translation
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

  getImageText(){
    return _imageText
  }

  getTranslation(){
    return _translation
  }

}

export default new ImageStore