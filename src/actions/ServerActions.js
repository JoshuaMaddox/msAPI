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
  }
}
export default ServerActions


