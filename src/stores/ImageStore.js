import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import {  browserHistory } from 'react-router'

let _imageText = ''
let _translation = undefined
let _message = undefined
let _audioConfirmation = false
let _fileName = ''

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
        case 'AUDIO_CONFIRMATION_RECEIVED':
          _audioConfirmation = true
          _fileName = action.payload.textToAudio
          setTimeout(() => {this.emit('CHANGE')}, 7000)
          break;
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

  getAudioConfirmation(){
    return _audioConfirmation
  }

  getFileName(){
    return _fileName
  }
}

export default new ImageStore