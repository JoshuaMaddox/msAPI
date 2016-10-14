import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveImgText(imageText){
    AppDispatcher.dispatch({
      type: 'IMAGE_TEXT_RECEIVED',
      payload: { imageText }
    }) 
  },

  receiveTranslation(translation){
     AppDispatcher.dispatch({
      type: 'TRANSLATION_RECEIVED',
      payload: { translation }
    })
  },

  confirmEmail(){
    AppDispatcher.dispatch({
      type: 'CONFIRMATION_RECEIVED'
    })
  },

  confirmAudio(textToAudio){
    AppDispatcher.dispatch({
      type: 'AUDIO_CONFIRMATION_RECEIVED',
      payload: { textToAudio }
    })
  }
}
export default ServerActions


