import API from '../API'

const ToAPIActions = {
  sendURL(imgUrl){
    API.sendURL(imgUrl) 
  },

  getTranslation(imageText, id){
    API.getTranslation(imageText, id)
  },

  sendTransEmail(transToSend, email, fileName){
    API.sendTransEmail(transToSend, email, fileName)
  },

 getAudio(imageText){
  API.getAudio(imageText)
 }
}
export default ToAPIActions