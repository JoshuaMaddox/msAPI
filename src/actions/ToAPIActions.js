import API from '../API'

const ToAPIActions = {
  sendURL(imgUrl){
    API.sendURL(imgUrl) 
  },

  getTranslation(imageText, id){
    API.getTranslation(imageText, id)
  },

  sendTransEmail(transToSend, email){
    API.sendTransEmail(transToSend, email)
  }
}
export default ToAPIActions