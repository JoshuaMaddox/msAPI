import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import {  browserHistory } from 'react-router'

let _imageText = ''
let _translation = undefined
let _message = undefined

class ImageStore extends EventEmitter {
  constructor(){
    super()

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'IMAGE_TEXT_RECEIVED':
          _imageText = action.payload.imageText
          this.emit('CHANGE')
          browserHistory.push('/image/translation')
          break
        case 'TRANSLATION_RECEIVED':
          _imageText = action.payload.translation
          _message = undefined
          this.emit('CHANGE')
          break
        case 'CONFIRMATION_RECEIVED':
          _message = 'Email Sent!'
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

  getMessage(){
    return _message
  }
}

export default new ImageStore