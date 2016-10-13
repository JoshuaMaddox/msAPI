import API from '../API'

const ToAPIActions = {
  sendURL(imgUrl){
    API.sendURL(imgUrl) 
  },

  getTranslation(imageText){
    API.getTranslation(imageText)
  }
}
export default ToAPIActions