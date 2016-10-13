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

  getTranslation(imageText){
    get(`/image/translation?string=${imageText}`)
    .then(res => {
      let { data } = res
      let translationArr = data.data.translations[0].translatedText
      console.log('translationArr: ', translationArr)
      ServerActions.receiveTranslation(translationArr)
    })
  }
}

export default API



