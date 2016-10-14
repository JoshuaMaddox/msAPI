import axios, { get, put, post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  sendURL(imgURL) { 
    post(`/image/vision?url=${imgURL}`)
      .then(res => {
        let { data } = res
        ServerActions.receiveImgText(data)
      })
      .catch(console.error)
  },

  getTranslation(imageText, id){
    console.log('id: API', id);
    get(`/image/translation?string=${imageText}&id=${id}`)
    .then(res => {
      let { data } = res
      let translationArr = data.data.translations[0].translatedText
      translationArr = translationArr.replace(/&#39;/g,"'")
      ServerActions.receiveTranslation(translationArr)
    })
    .catch(console.error);
  },

  sendTransEmail(transToSend, email, fileName){
    get(`/image/translation/email?q=${transToSend}&email=${email}&fileName=${fileName}`)
    .then(res => {
        ServerActions.confirmEmail()
    })
    .catch(console.error)
  },

  getAudio(imageText){
    get(`/image/audio?q=${imageText}`)
      .then(res => {
        let { data } = res
        ServerActions.confirmAudio(data)
      })
      .catch(console.error)
  }
}

export default API



